import express from "express";
import fs from "fs";
import path from "path";
import createDatabaseYaml from "../middleware/createDatabaseYaml"
import cratePeerYaml from "../middleware/cratePeerYaml"
var Docker = require('dockerode');

const { execSync, exec } = require('child_process');

const router = express.Router();
const indexJs = path.basename(__filename);

router.get("/status", (req, res) => res.send("OK good"));

router.post('/peer', async(req: any, res) => {
  try{
    const {id, organization, password} = req.body;
    const {DATABASE_BUKET: bucket, DATABASE_USERNAME: username, DATABASE_PASSWORD: dbpassword} = process.env;
    const CREATE_PRIMARY_INDEX=`\"CREATE PRIMARY INDEX ON ${bucket}\"`;

    // Compose 폴더 생성
    try{
      fs.mkdirSync(`docker-compose/peers/${id}`);
    } catch(e){
      res.json({
        message: '폴더 생성에 실패했습니다.'
      });
      return;
    }

    // Compose yaml 작성
    const db = createDatabaseYaml(id);

    // compose.yaml 생성
    fs.writeFileSync(`docker-compose/peers/${id}/${id}_db.yaml`, db.toString());
    
    // DB 도커 컨테이너 실행
    execSync(`cd docker-compose && docker-compose --env-file ../.env -f ./peers/${id}/${id}_db.yaml -f network.yaml up -d`);
    await sleep(10000);
    // 생성된 DB IP 주소 확보
    const dbHost = await execSync(`docker inspect -f "{{ .NetworkSettings.Networks.mainnet.IPAddress }}" ${id}_db`);

    // 피어 ymal 파일 생성
    const peer = cratePeerYaml(id, username!, password, dbpassword!, bucket!, organization, dbHost.toString().split('\n')[0]);
    fs.writeFileSync(`docker-compose/peers/${id}/${id}.yaml`, peer.toString());
    
    // Couchbase 
    execSync(`docker exec -i ${id}_db /bin/bash -c "couchbase-cli cluster-init -c 0.0.0.0 --cluster-username ${username} --cluster-password ${dbpassword} --services data,index,query,fts,analytics --cluster-ramsize 512 --cluster-index-ramsize 512 --cluster-eventing-ramsize 512 --cluster-fts-ramsize 512 --cluster-analytics-ramsize 1024 --cluster-fts-ramsize 512 --index-storage-setting default"`);
    execSync(`docker exec -i ${id}_db /bin/bash -c "couchbase-cli bucket-create -c 0.0.0.0 --username ${username} --password ${dbpassword} --bucket ${bucket} --bucket-type couchbase --bucket-ramsize 512"`);

    execSync(`cd docker-compose && docker-compose --env-file ../.env -f ./peers/${id}/${id}.yaml -f network.yaml up -d`);
    
    //생성된 피어 아이피 확보
    const host = await execSync(`docker inspect -f "{{ .NetworkSettings.Networks.mainnet.IPAddress }}" ${id}`);
    
    const nginxUnitFile = fs.readFileSync('config/config.json');
    let nginxConfig = JSON.parse(nginxUnitFile.toString('utf-8'));

    nginxConfig.routes.push({
        match: {
            host: `${id}.ky2chain.com`,
            uri: "/*"
        },
        action: {
            proxy: `http://${host.toString().split('\n')[0]}:5000`
        }
    });

    await fs.writeFileSync("config/config.json", JSON.stringify(nginxConfig, null, 2), 'utf-8');
    console.log("file saved!");
    execSync('curl -X PUT --data-binary @config/config.json --unix-socket /var/run/unit/control.sock http://localhost/config/');

    res.json({url: `http://${id}.ky2chain.com`});
  }catch(error: any){
    console.log(error.toString());
    res.send(error.toString());
  }
});

router.post('/peer/start', async(req: any, res) => {
  // Start Peer Docker
  try {
    const {id} = req.body;
    const {DATABASE_BUKET: bucket, DATABASE_USERNAME: username, DATABASE_PASSWORD: dbpassword} = process.env;

    execSync(`docker exec -i ${id}_db sh -c "/opt/couchbase/bin/cbq -e couchbase://0.0.0.0 -user ${username} -password ${dbpassword} -script 'CREATE PRIMARY INDEX ON \\\`default\\\`:\\\`test-bucket\\\`'"`, (err: any, stdout: any, stderr: any) => {
      console.log(err);
      console.log(stdout);
      console.log(stderr);
    });
    
    res.status(200).json(
      {"message": `${id} is start!`}
    );
  } catch(err) {
    res.send(err);
  }  
});

router.post('/peer/down', async(req: any, res) => {
  try {
    const {id} = req.body;
    await execSync(`cd docker-compose && docker-compose -f ${id}.yaml down`, (err: any, stdout: any, stderr: any) => {
      console.log(err);
      console.log(stdout);
      console.log(stderr);
    });
  } catch(err) {
      console.log(err);
  }
  res.send("ok");
});

router.delete("/peer/:id", async(req, res) => {
  const id = req.params.id;
  execSync(`docker stop ${id}_db && docker rm ${id}_db && docker stop ${id} && docker rm ${id}`);
  fs.rmdirSync(`docker-compose/peers/${id}`, { recursive: true, });
  
  const nginxUnitFile = fs.readFileSync('config/config.json');
  let nginxConfig = JSON.parse(nginxUnitFile.toString('utf-8'));
  nginxConfig.routes = nginxConfig.routes.filter( (route: any) => route.match.host !== `${id}.ky2chain.com`);

  await fs.writeFileSync("config/config.json", JSON.stringify(nginxConfig, null, 2), 'utf-8');
  console.log("file saved!");
  execSync('curl -X PUT --data-binary @config/config.json --unix-socket /var/run/unit/control.sock http://localhost/config/');

  res.send('clearly delete')
})

const sleep = (ms: number) => {
  return new Promise(resolve=>{
      setTimeout(resolve,ms)
  })
}

export default router;

