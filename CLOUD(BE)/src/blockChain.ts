import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import merkle from 'merkle';
import { Block, BlockHeader } from './block';
import fs from 'fs';

// Get UTC timestamp
const utcTimestamp = () => moment().utc().valueOf();

const calculateHashForBlock = (block: Block) => {
  return calculateHash(
    block.header.version,
    block.header.index,
    block.header.previousHash,
    block.header.merkleRoot,
    block.header.event_id,
    block.header.organization,
    block.header.generated_time,
    block.data,
  )
}
const calculateHash = (
  version: string,
  index: number,
  previousHash: string,
  merkleRoot: string,
  event_id: string, 
  organization: string, 
  generated_time: number, 
  data: string,
) => {
  return CryptoJS.SHA256(version+ index+ previousHash+ merkleRoot+ event_id+ organization+ generated_time+ data).toString().toUpperCase();
}

const getGenesisBlock = (): Block => {
  const version = '1.0.0';
  const index = 0;
  const previousHash = '0'.repeat(64);
  const generated_time = 1663897055 // Fri Sep 23 2022 10:37:35 GMT+0900 (대한민국 표준시)
  const data = [{
    rank: 'G',
    user: 'genesis',
    test: 'genesis'
  }];
  const event_id = '0';
  
  const merkleTree = merkle("sha256").sync(data);
  const merkleRoot = merkleTree.root() || '0'.repeat(64);

  const organization = 'ky2'

  const header: BlockHeader = {version, index, previousHash, generated_time, merkleRoot, event_id, organization};

  return {header, data};
}

const getCurrentVersion = () => {
  const packageJson: any = fs.readFileSync("../package.json");
  const currentVersion = JSON.parse(packageJson).version;
  return currentVersion;
}

// Generate a block
const generateNextBlock = (db: any, organization: string, data: any):Block => {
  const previousBlock: Block = db.getLeastBlock();
  const currentVersion = getCurrentVersion();
  const nextIndex = previousBlock.header.index + 1;
  const previousHash = calculateHashForBlock(previousBlock);
  const event_id = uuidv4()
  const generated_time = utcTimestamp();

  const merkleTree = merkle("sha256").sync(data);
  const merkleRoot = merkleTree.root() || '0'.repeat(64);

  const newBlockHeader: BlockHeader = {version:currentVersion, index:nextIndex, previousHash, generated_time, merkleRoot, event_id, organization}

  return {header:newBlockHeader, data}
  //const id = calculateHash(event_id, organization, generated_time, data);
  //return block(id, event_id, organization, generated_time, data);
}

// Check if a block is valid
const isValidBlock = (db: any, logger: any, block: Block) => {
  const previousBlock: Block = db.getLeastBlock();
  if(previousBlock.header.index + 1 !== block.header.index) {
    logger.error('Invaild index');
    return false;
  }
  else if(calculateHashForBlock(previousBlock) !== block.header.previousHash) {
    logger.error('Invaild previousHash')
    return false;
  }
  else{
    if(
      (block.data.length !== 0 && (merkle("sha256").sync(block.data).root() !== block.header.merkleRoot))
      || (block.data.length === 0 && ('0'.repeat(64) !== block.header.merkleRoot))
    ) {
      logger.error('Invaild merkleRoot');
      return false;
    }
  }
  return true;
}


// Export block methods
export {
  generateNextBlock,
  isValidBlock,
  getGenesisBlock
};
