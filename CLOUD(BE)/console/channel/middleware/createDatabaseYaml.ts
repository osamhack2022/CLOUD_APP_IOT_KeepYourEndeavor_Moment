import YAML from 'yaml';

export default function (id: string) {
    const databaseObject = {
        version: "3.5",
        services: {
            [`${id}_db`]: {
                image: "couchbase",
                container_name: `${id}_db`,
                user: "couchbase",
                networks: ["mainnet"],
            },
        }
    }
    
    const docs: any = new YAML.Document();
    docs.contents = databaseObject;

    return docs;
}