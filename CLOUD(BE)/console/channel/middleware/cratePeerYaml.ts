import YAML from 'yaml';

export default function (
    id: string, 
    username: string, 
    password: string, 
    dbpassword: string, 
    bucket: string,
    organization: string,
    dbHost: string,
    ) {
    const jsonObject = {
        version: "3.5",
        services: {
          [id]: {
            image: 'node:14',
            container_name: id,
            volumes: ['../../../:/app'],
            environment: [
              `DATABASE_USERNAME=${username}`,
              `DATABASE_PASSWORD=${dbpassword.replace('\\', '').trim()}`,
              `DATABASE_HOST=couchbase://${dbHost}`,
              `DATABASE_BUKET=${bucket}`,
              'KAFKA_HOST=172.24.255.31:29092',
              `KAFKA_GROUP=${id}`,
              'ROLE=peer',
              `ORGANIZATION=${organization}`,
              `PEERID=${id}`,
              `PASSWORD=${password}`
            ],
            command: 'npm start',
            working_dir: '/app',
            networks: ["mainnet"],
          }
        }
      }
    
      const doc:any = new YAML.Document();
      doc.contents = jsonObject;

    return doc;
}