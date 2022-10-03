import express from "express";
import fs from "fs";
import path from "path";
const { exec } = require('child_process');
import YAML from 'yaml';


const router = express.Router();
const indexJs = path.basename(__filename);

router.get("/status", (req, res) => res.send("OK good"));

router.post('/peer', async(req: any, res) => {
  const {id, organization} = req.body;
  try {
    const jsonObject = {
      version: "3.5",
      services: {
        [id]: {
          image: 'node:14',
          container_name: id,
          volumes: ['../:/app'],
          environment: [
            'DATABASE_USERNAME=${DATABASE_USERNAME}',
            'DATABASE_PASSWORD=${DATABASE_PASSWORD}',
            'DATABASE_HOST=couchbase://172.24.255.21',
            'DATABASE_BUKET=${DATABASE_BUKET}',
            'KAFKA_HOST=172.24.255.31:29092',
            `KAFKA_GROUP=${id}`,
            'ROLE=peer',
            `ORGANIZATION=${organization}`
          ],
          command: 'npm start',
          working_dir: '/app',
          networks: {
            mainnet: {
              ipv4_address: '172.24.255.53'
            }
          }
        }
      }
  }

  const doc:any = new YAML.Document();
  doc.contents = jsonObject;
  await fs.writeFile(`docker-compose/${id}.yaml`, doc.toString(), function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });
  } catch(err) {
      console.log(err);
  }
  res.send("ok");
});

router.post('/up', async(req: any, res) => {
  const {id} = req.body;

  try {
    await exec(`cd docker-compose && docker-compose --env-file ../.env -f ${id}.yaml -f network.yaml up`, (err: any, stdout: any, stderr: any) => {
      console.log(err);
      console.log(stdout);
      console.log(stderr);
    });
  } catch(err) {
      console.log(err);
  }
  res.send("ok");
});

router.post('/down', async(req: any, res) => {
  try {
    await exec('cd docker-compose && docker-compose -f peer-test.yaml down', (err: any, stdout: any, stderr: any) => {
      console.log(err);
      console.log(stdout);
      console.log(stderr);
    });
  } catch(err) {
      console.log(err);
  }
  res.send("ok");
});

console.log(fs.readdirSync(__dirname), indexJs);

fs.readdirSync(__dirname)
  .filter(file => file.indexOf(".") !== 0 && file !== indexJs && file.slice(-3) === ".js")
  .forEach(routeFile => {
      router.use(`/${routeFile.split(".")[0]}`, require(`./${routeFile}`).default)
});

export default router;