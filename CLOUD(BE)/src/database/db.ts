import {getDefaultInstance, Ottoman, start} from 'ottoman';
import ledger from './ledger';

let ottoman = getDefaultInstance();

type configType = {
    host: string,
    buket: string,
    username: string,
    password: string,
}

export const db = async (config: configType, logger: any) => {
    try{
        logger.info("Connecting DB...");
        const {host, buket, username, password} = config;

        if (!ottoman) {
            ottoman = new Ottoman({collectionName: '_default'});
        }

        await ottoman.connect({
            connectionString: host, // with default port 8091
            bucketName: buket,
            username: username,
            password: password
        });
        
        await start();
        logger.info("DB Connection is Success!")
    }catch(error){
        logger.error(error);
    }

    return new ledger(ottoman);
}