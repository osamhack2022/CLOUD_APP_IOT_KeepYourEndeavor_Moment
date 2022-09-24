import path from "path";

require("dotenv-safe").config({
  allowEmptyValues: true,
  path: path.join(__dirname, "../../.env"),
  sample: path.join(__dirname, "../../.env.example")
});

const config = {
  env: process.env.NODE_ENV,
  port: 5000,
  id: '123',
  role: 'peer',
  console: false,
  organization: 'army',
  db: {
    host: process.env.DATABASE_HOST,
    buket: process.env.DATABASE_BUKET,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  kafka: {
    broker: process.env.KAFKA_HOST,
    topics: {
      pending: 'test-topic',
      ledger: 'blockchain.blocks.ledger'
    },
    consumer: {
      autoCommit: true,
      encoding: 'utf8',
      keyEncoding: 'utf8'
    },
    producer: {
      partitionerType: 2
    }
  },
  logs: {
    level: 'info',
    console: false,
    path: './logs'
  }
};

export default config;