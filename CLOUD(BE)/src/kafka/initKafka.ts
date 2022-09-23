import { Kafka } from "kafkajs";

export default async function (ky2: any) {
    const kafkaConfig = ky2.configs.kafka;

    const kafkaClient = new Kafka({
        clientId: kafkaConfig.id,
        brokers: [kafkaConfig.broker]
    });
    
    const admin = kafkaClient.admin()
    await admin.connect()

    const topicList = await admin.listTopics();

    if(topicList.indexOf('test-topic') === -1){
        ky2.logger.info('Create Test Topic!');
        await admin.createTopics({
            waitForLeaders: true,
            topics: [
              { topic: kafkaConfig.topics.pending },
            ],
        })
    }
    
    const producer = kafkaClient.producer()
    const consumer = kafkaClient.consumer({ groupId: kafkaConfig.group.id })
    
    await consumer.connect()
    await producer.connect()

    await consumer.subscribe({ topic: kafkaConfig.topics.pending, fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            await ky2.onMessage(topic, message.value);
        }
    });

    return {producer, consumer};
}