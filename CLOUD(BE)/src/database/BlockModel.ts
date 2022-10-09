import { Schema, getDefaultInstance, Ottoman } from "ottoman";

let ottoman = new Ottoman({ collectionName: '_default' });

const BlockSchema = new Schema({
    header: {
        version: {type: String, require: true},
        index: Number,
        previousHash: String,
        generated_time: String,
        merkleRoot: String,
        event_id: String,
        organization: String,
    },
    data: {
        user: String,
        issue_id: String,
        result: String,
    }
})

export const BlockModel = ottoman.model('Block', BlockSchema);