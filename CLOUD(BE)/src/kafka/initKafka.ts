import { Kafka } from "kafkajs";

export default async function (ky2: any) {
    const kafkaConfig = ky2.configs.kafka;
    ky2.logger.info("Connecting to Kafka... ");
    const kafkaClient = new Kafka({
        clientId: kafkaConfig.id,
        brokers: [kafkaConfig.broker]
    });
    
    const admin = kafkaClient.admin()
    await admin.connect()

    const topicList = await admin.listTopics();
    console.log(topicList);
    if(topicList.indexOf(kafkaConfig.topics.pending) === -1){
        ky2.logger.info(`Create ${kafkaConfig.topics.pending} Topic!`);
        await admin.createTopics({
            waitForLeaders: true,
            topics: [{ 
                  topic: kafkaConfig.topics.pending,
                  numPartitions: 3,
            }]
        })
    }
    
    const producer = kafkaClient.producer()
    const consumer = kafkaClient.consumer({ groupId: kafkaConfig.group.id })
    
    await consumer.connect()
    await producer.connect()

    await consumer.subscribe({ topic: kafkaConfig.topics.pending, fromBeginning: true })
    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ topic, partition, message }) => {
            await ky2.onMessage(topic, message.value);
        }
    });
    ky2.logger.info("Success Connect to Kafka!!");
    return {producer, consumer};
}