import ecdsa from 'elliptic';
import fs from 'fs';
const ec = new ecdsa.ec("secp256k1");

const privateKeyLocation =  `wallet/${process.env.PRIVATE_KEY || 'default'}`;
const privateKeyFile = `${privateKeyLocation}/private_key`;

const generatePrivateKey = () => {
    const keyPair = ec.genKeyPair();
    const privateKey = keyPair.getPrivate();
    return privateKey.toString();
}

const initWallet = () => {
    if(fs.existsSync(privateKeyFile)){
        console.log("Load wallet with private key from %s", privateKeyFile);
        return;
    }

    if(!fs.existsSync("wallet/")) { fs.mkdirSync("wallet/"); }
    if(!fs.existsSync(privateKeyLocation)) { fs.mkdirSync(privateKeyLocation) }

    const newPrivateKey = generatePrivateKey();
    fs.writeFileSync(privateKeyFile, newPrivateKey);
    console.log(`Create new wallet with private key to: %s`, privateKeyFile);
}

const getPrivateFromWallet = () => {
    const buffer = fs.readFileSync(privateKeyFile, "utf8");
    return buffer.toString();
}

const getPublicFromWallet = () => {
    const privateKey = getPrivateFromWallet();
    const key = ec.keyFromPrivate(privateKeyFile, "hex");
    return key.getPublic().encode("hex", false);
}

export {
    initWallet,
    getPublicFromWallet,
}