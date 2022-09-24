//TODO: API 서버 Console로 변경 예정
import express from 'express';
import routes from './routes';

const server = async(config: any, sdk: any, db: any) => {
    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use((req:any, res, next) => {
        req.db = db;
        req.sdk = sdk;
        return next();
    });

    app.use("/v1", routes);
    
    app.listen(config.port);
}

export default server;