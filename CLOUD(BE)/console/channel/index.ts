//TODO: API 서버 Console로 변경 예정
import express from 'express';
import routes from './routes'
const { execSync, exec } = require('child_process');

const channel = async(config: any) => {
    const app = express();
    
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use("/v1", routes);
    const {DATABASE_BUKET: bucket, DATABASE_USERNAME: username, DATABASE_PASSWORD: dbpassword} = process.env;

    app.listen(config.port);
}

export default channel;