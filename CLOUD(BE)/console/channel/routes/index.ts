import express from "express";
import fs from "fs";
import path from "path";
import createDatabaseYaml from "../middleware/createDatabaseYaml"
import cratePeerYaml from "../middleware/cratePeerYaml"
const { execSync, exec } = require('child_process');

const router = express.Router();
const indexJs = path.basename(__filename);

router.get("/status", (req, res) => res.send("OK good"));

router.post('/peer', async(req: any, res) => {
  try{
    const {id, organization, password} = req.body;
    const {DATABASE_BUKET: bucket, DATABASE_USERNAME: username, DATABASE_PASSWORD: dbpassword} = process.env;

    fs.mkdirSync(`docker-compose/peers/${id}`);

    const db = createDatabaseYaml(id);

    fs.writeFileSync(`docker-compose/peers/${id}/${id}_db.yaml`, db.toString());
    
    execSync(`cd docker-compose && docker-compose --env-file ../.env -f ./peers/${id}/${id}_db.yaml -f network.yaml up -d`);
     
    const dbHost = await execSync(`docker inspect -f "{{ .NetworkSettings.Networks.mainnet.IPAddress }}" ${id}_db`);
    const peer = cratePeerYaml(id, username!, password, dbpassword!, bucket!, organization, dbHost);
    
    fs.writeFileSync(`docker-compose/peers/${id}/${id}.yaml`, peer.toString());

    res.json({url: `http://${id}.jerrykang.com`});
  }catch(error){
    res.send(error);
  }
});

router.post('/peer/start', async(req: any, res) => {
  // Start DB Docker
  try {
    const {id} = req.body;
    const {DATABASE_BUKET: bucket, DATABASE_USERNAME: username, DATABASE_PASSWORD: dbpassword} = process.env;
    
    execSync(`docker exec -i ${id}_db /bin/bash -c "couchbase-cli cluster-init -c 0.0.0.0 --cluster-username ${username} --cluster-password ${dbpassword} --services data,index,query,fts,analytics --cluster-ramsize 512 --cluster-index-ramsize 512 --cluster-eventing-ramsize 512 --cluster-fts-ramsize 512 --cluster-analytics-ramsize 1024 --cluster-fts-ramsize 512 --index-storage-setting default"`);
    execSync(`docker exec -i ${id}_db /bin/bash -c "couchbase-cli bucket-create -c 0.0.0.0 --username ${username} --password ${dbpassword} --bucket ${bucket} --bucket-type couchbase --bucket-ramsize 512"`);
    execSync(`cd docker-compose && docker-compose --env-file ../.env -f ./peers/${id}/${id}.yaml -f network.yaml up -d`);

    const host = await execSync(`docker inspect -f "{{ .NetworkSettings.Networks.mainnet.IPAddress }}" ${id}`);

    const nginxUnitFile = fs.readFileSync('config/config.json');
    let nginxConfig = JSON.parse(nginxUnitFile.toString('utf-8'));
    console.log(nginxConfig)
    nginxConfig.routes.push({
        match: {
            host: `${id}.jerrykang.com`,
            uri: "/*"
        },
        action: {
            proxy: `http://${host.toString().split('\n')[0]}:5000`
        }
    });

    await fs.writeFileSync("config/config.json", JSON.stringify(nginxConfig, null, 2), 'utf-8');
    console.log("file saved!");
    execSync('curl -X PUT --data-binary @config/config.json --unix-socket /var/run/unit/control.sock http://localhost/config/');
    
    res.send("all service running!");
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
  nginxConfig.routes = nginxConfig.routes.filter( (route: any) => route.match.host !== `${id}.jerrykang.com`);

  await fs.writeFileSync("config/config.json", JSON.stringify(nginxConfig, null, 2), 'utf-8');
  console.log("file saved!");
  execSync('curl -X PUT --data-binary @config/config.json --unix-socket /var/run/unit/control.sock http://localhost/config/');

  res.send('clearly delete')
})

export default router;

