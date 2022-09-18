import {getDefaultInstance, Ottoman} from 'ottoman';
import ledger from './ledger';

export let ottoman = getDefaultInstance();

type configType = {
    host: string,
    buket: string,
    username: string,
    password: string,
}

export const db = async (config: configType, logger: any) => {
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

    logger.info("DB Connection is Success!")

    const BlockModel = ottoman.model('Block', {
        id: String,
        event_id: String,
        organization: String,
        generated_time: Number,
        data: String,
    });

    return new ledger(ottoman, BlockModel);
}