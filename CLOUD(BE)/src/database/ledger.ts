import { Ottoman, start, close } from "ottoman";
import { Block } from "../block";
import { BlockModel } from "./BlockModel";

export default class {
    ottoman: Ottoman;

    constructor(ottoman: Ottoman){
        this.ottoman = ottoman;
    }

    async getBlock(): Promise<any>{
        await start();
        const data = await BlockModel.find();
        await close();

        return data; 
    }

    async getLeastBlock(): Promise<any>{
        await start();
        const data = await BlockModel.findOne({}, {sort:{generated_time: 'ASC'}})
        await close();
        return data;
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
        
        await close();
    }
}