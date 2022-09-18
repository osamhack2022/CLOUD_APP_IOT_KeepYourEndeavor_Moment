import { Kafka } from "kafkajs";

export default async function (ky2: any) {
    //TODO: Config File로 대체예정
    const kafkaClient = new Kafka({
        clientId: '',
        brokers: ['172.24.255.31:29092']
    });

    const admin = kafkaClient.admin()
    await admin.connect()
    await admin.createTopics({
        waitForLeaders: true,
        topics: [
          { topic: 'test-topic' },
        ],
    })

    const producer = kafkaClient.producer()
    const consumer = kafkaClient.consumer({ groupId: 'test-group' })
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            await ky2.onMessage(topic, message.value);
        }
    });

    return {producer, consumer};
}