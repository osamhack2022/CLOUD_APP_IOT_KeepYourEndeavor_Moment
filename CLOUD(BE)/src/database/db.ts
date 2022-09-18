import {getDefaultInstance, Ottoman} from 'ottoman';
import ledger from './ledger';

export let ottoman = getDefaultInstance();

export const db = async () => {

    if (!ottoman) {
        ottoman = new Ottoman({collectionName: '_default'});
    }

    await ottoman.connect({
        connectionString: 'couchbase://172.24.255.20', // with default port 8091
        bucketName: 'testBuket',
        username: 'Administrator',
        password: 'ab2953'
    });

    const BlockModel = ottoman.model('Block', {
        id: String,
        event_id: String,
        organization: String,
        generated_time: Number,
        data: String,
    });

    return new ledger(ottoman, BlockModel);
}