# KY2 Chain

KY2Chain 은 군관련 시험정보 무결성 유지를 위해 JS로 만들어진 빠르고 가벼운 프라이빗 블록체인입니다.
Pure p2p를 활용하지 않고 중앙에 Kafka Cluster 가 노드를 중재하는 역할을 수행합니다.
react를 기반으로한 gui console을 제공합니다.
노드는 라즈베리파이에서도 작동할 수 있도록 설계했습니다.

**노드구성**

- GUI Console
    - Backend (NodeJS)
    - frontend (react)
- Kafka
    - KafkaJS ([https://www.npmjs.com/package/kafkajs](https://www.npmjs.com/package/kafkajs))
- Couchbase
    - OttemaJS
- Block-chain core

**필수조건**

- Apache Kafka v2.1+ (or equivalent Confluent Kafka v4.1.2+)
- NodeJS v14 +
- CouchBase v3+
- Docker-Compose, Doocker