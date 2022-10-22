let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);
const crypto = require('crypto');
require('dotenv').config();

const createSalt = () =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('base64'));
        });
    });

exports.createHashedPassword = (plainPassword) =>
    new Promise(async (resolve, reject) => {
        const salt = await createSalt(); // key 만들어서 대입
        crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve({ pwd: key.toString('base64'), salt });
        });
    }); 

exports.makePasswordHashed = (userId, plainPassword) =>
    new Promise(async (resolve, reject) => {
        // userId인자로 해당 유저 salt를 가져오는 부분
        try {
            const [rowUser, fieldUser] = await conn.execute('SELECT salt FROM user WHERE id = ?', [userId]);
            const salt = rowUser[0].salt;
            // 위에서 가져온 salt와 plainPassword를 다시 해시 암호화 시킴. (비교하기 위해)
            crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
                    if (err) reject(err);
                    resolve(key.toString('base64'));
            });
        } catch (err) {
            reject(err);
        }
    });

exports.makeHashedValue = (notHashedValue) =>
    new Promise(async (resolve, reject) => {
        crypto.pbkdf2(notHashedValue, process.env.SECRET, 1, 12, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve(key.toString('base64').replace(/\//gi,''));
        });
    }); 