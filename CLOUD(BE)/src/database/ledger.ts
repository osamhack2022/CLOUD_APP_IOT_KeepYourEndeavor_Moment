import { Ottoman } from "ottoman";
import { Block } from "../block";
import { BlockModel } from "./BlockModel";

export default class {
    ottoman: Ottoman;

    constructor(ottoman: Ottoman){
        this.ottoman = ottoman;
    }

    async getBlock(): Promise<any>{
        return await BlockModel.find();
    }

    async getLeastBlock(): Promise<any>{
        return await BlockModel.findOne({}, {sort:{generated_time: 'ASC'}})
    }
    
    async addBlock(block: Block){
        const myBlock = new BlockModel(block);

        const runAsync = async () => {
            await myBlock.save();
            console.log(`SUCCESS: user ${block.header.index} added!`);
        }
          
        this.ottoman.start()
            .then(runAsync)
            .catch((error) => console.log('An error happened: ' + JSON.stringify(error)))
    }
}