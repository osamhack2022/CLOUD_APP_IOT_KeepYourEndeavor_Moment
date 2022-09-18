import path from "path";

require("dotenv-safe").config({
  allowEmptyValues: true,
  path: path.join(__dirname, "../../.env"),
  sample: path.join(__dirname, "../../.env.example")
});

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  id: '123',
  role: 'peer',
  console: false,
  kafka: {
    topics: {
      pending: 'blockchain.blocks.pending',
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