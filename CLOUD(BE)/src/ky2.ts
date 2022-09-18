import { generateNextBlock, isValidBlock } from "./blockChain";
import loggerSystem from "./config/logger";
import initKafka from "./kafka/initKafka";
import { Consumer, Producer } from "kafkajs";
import { db } from "./database/db";

export default class {
    consumer!: Consumer
    producer!: Producer
    logger: any;
    configs: any;
    db: any;
    
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
            this.consumer = consumer;
            this.producer = producer;

            this.logger.info(`The ${role} with id ${id} is ready.`);
        }catch(err){
            this.logger.error(err);
        }
    }

    private serialize(data:string) {
        return JSON.stringify(data);
    }

    private deserialize(data: string) {
        return JSON.parse(data);
    }

    hasRole(r:string) {
        const { role } = this.configs;
        return role === r;
    }

    async addBlockToLedger(data: any) {
        try {
          // Get db model instance
          //const db = this.db;
          // Check if block is valid
          const valid = isValidBlock(this.logger, data);
          if (!valid) {
            const invalidMsg = (data && data.id) ? `Skipping invalid block ${data.id}.` : 'Skipping an invalid block.';
            this.logger.error(invalidMsg);
            return false;
          }
          this.logger.debug(`Received block ${data.id}.`);
          // Store block on db
          await this.db.addBlock(data);
          this.logger.info(`Added new block ${data.id}.`);
          this.logger.debug('Added new block', data);
          // Return the new block
          return data.id;
        } catch(err) {
          this.logger.error(err);
        }
      }

    async onMessage(topic:any, data: string) {
        const { topics } = this.configs.kafka;
        const deserialized = this.deserialize(data);
        switch(topic) {
          case topics.pending:
            if (this.hasRole('peer')) {
              return await this.addBlockToLedger(deserialized);
            }
            return false;
          default:
            throw Error('Received message of an invalid topic');
        }
    }

    async sendNewBlock(data: any) {
        try {
          const { organization } = this.configs;
          // Generate block
          // const serializedData = this.serialize(data);
          const newblock = generateNextBlock(organization, data);
          this.logger.info(`Building a block for the transaction ${newblock.id} sended by organization ${organization}.`);
          this.logger.debug('Built new block', newblock);
          // Publish block
          const topic = this.configs.kafka.topics.pending;
          await this.__produce(topic, newblock);
          // Return the new block
          return newblock.id;
        } catch(err) {
          this.logger.error(err);
        }
    }

    async __produce(topic: string, data: any) {
        try {
            const serialized = this.serialize(data);

            return this.producer.send({
                topic: 'quickstart-events',
                messages: [
                  { value: serialized },
                ],
            })
        } catch(err) {
            this.logger.error(err);
        }
    }
}