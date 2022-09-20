import { ModelTypes, Ottoman } from "ottoman";

export type BlockModel = {
    id: string;
    event_id: string;
    organization: string;
    generated_time: number;
    data: string;
}

export default class {
    ottoman: Ottoman;
    BlockModel: ModelTypes<any, any>;

    constructor(ottoman: Ottoman, BlockModel: ModelTypes<any, any>){
        this.ottoman = ottoman;
        this.BlockModel = BlockModel;
    }

    async getBlock(): Promise<any>{
        return await this.BlockModel.find();
    }
    
    async addBlock(block: BlockModel ){
       //TODO: DB 연결 부분 수정 할것
        
        const myBlock = new this.BlockModel({
            id: block.id,
            event_id: block.event_id,
            oragnization: block.organization,
            generated_time: block.generated_time,
            data: block.data,
        })
        const runAsync = async () => {
            await myBlock.save();
            console.log(`SUCCESS: user ${block.id} added!`);
          }
          
          this.ottoman.start()
            .then(runAsync)
            .catch((error) => console.log('An error happened: ' + JSON.stringify(error)))
    }
}