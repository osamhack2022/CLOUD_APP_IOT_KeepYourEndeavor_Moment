import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import moment from 'moment';

// Get UTC timestamp
const utcTimestamp = () => moment().utc().valueOf();

// Calculate hash of a block
const calculateHash = (event_id: string, organization: string, generated_time: number, data: string) => {
  const toHash = `${event_id}|${organization}|${generated_time}|${data}`;
  return CryptoJS.MD5(toHash).toString();
}

// Convert to block object
const toBlock = (b: any) => block(b.id, b.event_id, b.organization, b.generated_time, b.data);

// Block object
const block = (id: string, event_id: string, organization: string, generated_time: number, data: string) => ({
  id: id,
  event_id: event_id,
  organization: organization,
  generated_time: generated_time,
  data: data
});

// Generate a block
const generateNextBlock = (organization: string, data: string) => {
  const event_id = uuidv4()
  const generated_time = utcTimestamp();
  const id = calculateHash(event_id, organization, generated_time, data);
  return block(id, event_id, organization, generated_time, data);
}

// Calculate the hash from a block
const calculateHashFromBlock = (b: any) => calculateHash(b.event_id, b.organization, b.generated_time, b.data);

// Check if a block is valid
const isValidBlock = (logger: any, block: any) => {
  const oneBlockId = calculateHashFromBlock(block);
  if (oneBlockId !== block.id) {
    logger.error(`Found invalid hash ${block.id} compared to ${oneBlockId}.`);
    return false;
  }
  return true;
}


// Export block methods
export {
  toBlock,
  generateNextBlock,
  isValidBlock
};
