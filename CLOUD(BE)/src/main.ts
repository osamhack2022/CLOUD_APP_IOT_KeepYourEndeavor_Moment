import config from "./config/conifg";
import { db } from "./database/db";
import ky2 from "./ky2";

const main = async () => {
    let logger;
    db();
    try {
      const configs = config;
      const agent = new ky2(configs);
      await agent.start();
      logger = agent.logger;
      return true;
    } catch(err) {
      logger.error(err);
    }
}

main();