//TODO: API 서버 Console로 변경 예정
import express from 'express';
import routes from './routes'
const { createProxyMiddleware } = require("http-proxy-middleware");

const channel = async(config: any) => {
    const app = express();
    
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(
        "/peer1",
        createProxyMiddleware({
          target: "http://172.24.255.52/v1/dashboard",
          changeOrigin: false,
        })
      );
    app.use("/v1", routes);
    
    app.listen(config.port);
}

export default channel;