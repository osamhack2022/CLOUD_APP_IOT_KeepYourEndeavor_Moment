export interface BlockHeader {
    version: string;
    index: number;
    previousHash: string;
    generated_time: number;
    merkleRoot: string;
    event_id: string;
    organization: string;
}
export interface Block {
    header: BlockHeader;
    data: any;
}
