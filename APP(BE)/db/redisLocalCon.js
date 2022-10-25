const cmd = require('node-cmd');
const redis = require('redis');
cmd.run('start C:/Users/lopah/Desktop/Redis-x64-3.0.504/redis-server.exe',
        function(err, data, stderr){
            console.log(data,'local-redis start!');
        }
    );

module.exports = async () => {
    //* Redis 연결
    const redisClient = redis.createClient({legacyMode: true});
    redisClient.on('connect', () => {
       console.info('Local Redis connected!');
    });
    redisClient.on('error', (err) => {
       console.error('Redis Client Error', err);
    });
    await redisClient.connect(); // redis v4 연결 (비동기)
    const redisCli = redisClient.v4; // 기본 redisClient 객체는 콜백기반인데 v4버젼은 프로미스 기반이라 사용	
    return redisCli
}