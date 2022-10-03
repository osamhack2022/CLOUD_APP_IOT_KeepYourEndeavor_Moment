 <p  align="center">
<a  href="https://github.com/osamhack2022/CLOUD_WEB_IOT_KeepYourEndeavor_Moment"  target="_blank"  rel="noopener noreferrer">
<img src='https://github.com/osamhack2022/CLOUD_WEB_IOT_KeepYourEndeavor_Moment/raw/CLOUD/images/logo.png'/>
</a>
</p>
<h1  align="center">KY2 Chain</h1>
<h4  align="center">빠르고 안전한 군 전용 프라이빗 블록체인</h4>
<br/>

`KY2-Chain`은 **Keep Your Endeavor (블록체인 기반 공정한 병기본 솔루션)** 서비스의 데이터 무결성을 보증하기 위해 만들어진 허가형 블록체인 입니다.  타입스크립트를 기반으로 개발되었으며 메시징 서비스 `Kafka` 를 활용해 강력한 로드밸런싱과 빠른 속도를 보장합니다. 모든 데이터는 암호화 되어 `Couchbase`에 저장되여 네트워크가 허가된 사용자만이  자체적으로 제공하는 `KY2 Explorer`에서 블록데이터를 조회할 수 있습니다.



### 노드 종류
노드 종류는 채널, 피어로 총 2가지 종류가 있습니다. 
#### 피어 노드
다른 피어와 원장을 공유하며 블록체인을 일치시키는 역할을 진행합니다.
#### 채널 노드
피어 전체를 관리하고 피어를 삭제 / 생성하는 역할을 수행합니다.  


## 블록체인 설치 및 실행 방법
아래와 같은 환경을 권장합니다.
|service|version|
|--|--|
|**NodeJS**|v14|
|**Kafka**|3.2.x|
|Couchbase ottoman|v2|
|Docker|20.10.14|

프로젝트 실행방법은 `npm` 과 `docker` 두 가지 방식이 있습니다.
### 1. 도커 실행 방식
[KY2 도커 이미지](https://hub.docker.com/) 를 빌드해서 자동으로 개발환경을 세팅한 후 피어로 호스팅 해줍니다.
```
$ docker run --name peer001 \
-p 8000:8000 \
```
### 2. NPM 방식
[NPM 저장소](https://www.npmjs.com/) 에서 `KY2 Chain`을 다운 받습니다.
```
$ npm install ky2
```
카프카가 작동중이지 않다면 `Docker-compose` 로 카프카를 구동시킨 뒤 피어를 가동시킵니다. 
```
$ npm start
```
## REST API ( Channel )
### Create Peer
피어를 생성합니다. 
**Request**
`POST` `/v1/peer/`
```json
{
	"id": "userID",
	"organization": "0사단 0중대 0소대",
	"authentication": "" // 생체인증 정보
}
```
**Response** 
`200`
```json
{
	"url": "http://peer1.jerrykang.com" // 생성된 노드의 주소
}
```
### Start Peer
피어노드를 시작합니다.  
**Request**
`POST` `/v1/peer/start`
```json
{
	"id": "userID",
}
```
**Response** 
`200`
```json
{
	"url": "http://peer1.jerrykang.com" // 시작된 노드의 주소
}
```

### Start Peer
피어노드를 종료합니다.
**Request**
`POST` `/v1/peer/stop`
```json
{
	"id": "userID",
}
```
**Response** 
`200`
```json
{
	"url": "http://peer1.jerrykang.com" // 종료된 노드의 주소
}
```
## REST API ( Peer )
### Get Blocks
블록을 조회할 때 사용하는 API 입니다.

**Request**
`GET` `/v1/block/`
```json
{
	"data": [{
		"rank": "S",
		"user": "eunsol", // userUUID
		"test": "체력측정" // testUUID
	}]
}
```
**Response**
```json
{
  "blocks": {
    "rows": [
      {
        "_type": "Block",
        "data": [
          {
            "rank": "S",
            "user": "eunsol",
            "test": "체력측정"
          }
        ],
        "header": {
          "version": "1.0.0",
          "index": 1,
          "previousHash": "8E15155C5BACE388CBB750CF9724FF3CD63DF3CEED6419F9D5B134A36E01D062",
          "generated_time": "1663988978289",
          "merkleRoot": "B28C94B2195C8ED259F0B415AAEE3F39B0B2920A4537611499FA044956917A21",
          "event_id": "923fe3dc-1b66-4cd0-b0d1-f7796e36b463",
          "organization": "army"
        },
        "id": "1d7a93ba-e495-44e7-9f96-ebb1d101531a"
      },
      {
        "_type": "Block",
        "data": [
          {
            "rank": "G",
            "user": "genesis",
            "test": "genesis"
          }
        ],
        "header": {
          "version": "1.0.0",
          "index": 0,
          "previousHash": "0000000000000000000000000000000000000000000000000000000000000000",
          "generated_time": "1663897055",
          "merkleRoot": "B28C94B2195C8ED259F0B415AAEE3F39B0B2920A4537611499FA044956917A21",
          "event_id": "493fe070-5fb1-411b-ac59-b968ff34cae5",
          "organization": "ky2"
        },
        "id": "ea8b5ef8-ccc7-475a-b740-73961afcdc73"
      }
    ],
    "meta": {
      "requestId": "a7722236-d5d5-4f5f-85d6-c32c8a96378a",
      "clientContextId": "0ddd9c100913eeed",
      "status": "success",
      "signature": {
        "_type": "json",
        "data": "json",
        "header": "json",
        "id": "json"
      },
      "warnings": [],
      "metrics": {
        "elapsedTime": 2.074171,
        "executionTime": 2.008513,
        "sortCount": 0,
        "resultCount": 2,
        "resultSize": 846,
        "mutationCount": 0,
        "errorCount": 0,
        "warningCount": 0
      }
    }
  }
}
```
### Add Block
**Request**
`POST` `/v1/block/`
```json
{
	"data": [{
		"rank": "S",
		"user": "eunsol", // userUUID
		"test": "체력측정" // testUUID
	}]
}
```
**Response**
```json
{
  "header": {
    "version": "1.0.0",
    "index": 1,
    "previousHash": "8E15155C5BACE388CBB750CF9724FF3CD63DF3CEED6419F9D5B134A36E01D062",
    "generated_time": "1663988978289",
    "merkleRoot": "B28C94B2195C8ED259F0B415AAEE3F39B0B2920A4537611499FA044956917A21",
    "event_id": "923fe3dc-1b66-4cd0-b0d1-f7796e36b463",
    "organization": "army"
  },
  "data": [
    {
      "rank": "S",
      "user": "eunsol",
      "test": "체력측정"
    }
  ],
  "id": "1d7a93ba-e495-44e7-9f96-ebb1d101531a",
  "_type": "Block"
}
```
## Blockchain Explorer

블록체인 데이터를 손쉽게 조회하고 상태를 확인할 수 있는 탐색기를 제공합니다.

탐색기는 `React`를 사용해서 개발했습니다.

#### 로그인 페이지

![](../images/bc-explorer2.png)

#### 메인페이지

![](../images/bc-explorer1.png)