import { generateNextBlock, getGenesisBlock, isValidBlock } from "./blockChain";
import loggerSystem from "./config/logger";
import initKafka from "./kafka/initKafka";
import { Consumer, Producer } from "kafkajs";
import { db } from "./database/db";
import server from '../console/server'
import { Block } from "./block";

export default class {
    consumer!: Consumer
    producer!: Producer
    logger: any;
    configs: any;
    db: any;
    server: any;
    
    constructor(configs: any){
        const { role, id, logs } = configs;
        this.configs = configs;
        this.logger = loggerSystem(role, id, logs.level, logs.path, logs.console);
    }

    async start() {
        try{
            const {role, id, webconsole} = this.configs;
            const {consumer, producer} = await initKafka(this);
            this.db = await db(this.configs.db, this.logger);
            this.server = server(this.configs, this, this.db);
            this.consumer = consumer;
            this.producer = producer;
            this.initBlockchain();
            this.logger.info(`The ${role} with id ${id} is ready.`);
        }catch(err){
            this.logger.error(err);
        }
    }

    async initBlockchain() {
      const {rows} = await this.db.getBlock();

     if(rows.length === 0 ){ // Blockchain이 비어있다면
        const genesisBlock = getGenesisBlock();
        await this.db.addBlock(genesisBlock);
        this.logger.info("Add Genesis Block!");
      }
    }

    private serialize(block:Block) {
        return JSON.stringify(block);
    }

    private deserialize(data: string):Block {
        return JSON.parse(data);
    }

    hasRole(r:string) {
        const { role } = this.configs;
        return role === r;
    }

    async addBlockToLedger(block: Block) {
        try {
          const valid = isValidBlock(this.db, this.logger, block);
          if (!valid) {
            const invalidMsg = (block && block.header.index) ? `Skipping invalid block ${block.header.index}.` : 'Skipping an invalid block.';
            this.logger.error(invalidMsg);
            return false;
          }
          this.logger.debug(`Received block ${block.header.index}.`);
          // Store block on db
          await this.db.addBlock(block);
          this.logger.info(`Added new block ${block.header.index}.`);
          this.logger.debug('Added new block', block.header.index);
          // Return the new block
          return block.header.index;
        } catch(err) {
          this.logger.error(err);
        }
      }

    async onMessage(topic:any, data: string) {
        const { topics } = this.configs.kafka;
        const block = this.deserialize(data);
        switch(topic) {
          case topics.pending:
            if (this.hasRole('peer')) {
              return await this.addBlockToLedger(block);
            }
            return false;
          default:
            throw Error('Received message of an invalid topic');
        }
    }

    async sendNewBlock(data: any) {
        try {
          const { organization } = this.configs;

          const newblock = await generateNextBlock(this.db, organization, data);
          this.logger.info(`Building a block for the transaction ${newblock.header.index} sended by organization ${organization}.`);
          this.logger.debug('Built new block', newblock);
          // Publish block
          const topic = this.configs.kafka.topics.pending;
          await this.__produce(topic, newblock);
          // Return the new block
          return newblock.header.index;
        } catch(err) {
          this.logger.error(err);
        }
    }

    async __produce(topic: string, block: Block) {
        try {
            const serialized = this.serialize(block);

            return this.producer.send({
                topic: topic,
                messages: [
                  { value: serialized },
                ],
            })
        } catch(err) {
            this.logger.error(err);
        }
    }
}