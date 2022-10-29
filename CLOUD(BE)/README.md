 <p  align="center">
<a  href="https://github.com/osamhack2022/CLOUD_WEB_IOT_KeepYourEndeavor_Moment"  target="_blank"  rel="noopener noreferrer">
<img src='https://github.com/osamhack2022/CLOUD_APP_IOT_KeepYourEndeavor_Moment/blob/main/images/logo.png?raw=true'/>
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

### 노드 실행 방법
[NPM 저장소](https://www.npmjs.com/) 에서 `KY2 Chain`을 다운 받습니다.
```
$ npm install ky2
```
카프카가 작동중이지 않다면 `Docker-compose` 로 카프카를 구동시킨 뒤 피어를 가동시킵니다. 
```
$ npm start
```

### 카프카 실행
기본적으로 [카프카 Channel 서버가](http://kafka.ky2chain.com) 실행중이지만
만약 Ky2 서비스 이외에 다른 목적으로 사용하려면 `docker-compsoe/kafka.yaml` 을 실행시켜서 카프카 서버를 구동시켜줍니다.

```
$ cd docker-compose
```
```
$ docker-compose -f kafka.yaml -f network.yaml up
```
## KY2 Chain 동작 원리

1. 피어를 생성하면 자동으로 컨테이너가 생성됩니다.
2. 생성된 컨테이너를 Nginx Unit 이 자동으로 리버스 프록시를 통해서 ky2 도메인과 연결해서 반환합니다. ex) eunsol.ky2chain.com
3. 해당 도메인에 접속하면 블록체인 탐색기로 데이터 확인이 가능합니다.
4. 이후에 해당 피어에 데이터가 추가되면 블록체인이 검증 후 카프카를 통해 다른 살아있는 노드로 브로드케스팅하게됩니다.

## REST API ( Channel )
채널은 일반 피어 노드와 달리 데이터베이스를 가지지 않고 피어노드들을 관리하는 역할을 수행합니다. 
### Create Peer
블록체인 피어 노드를 생성합니다. 
**Request**
`POST` `/v1/peer/`
```json
{
	"id": "userID",
	"organization": "0사단 0중대 0소대",
	"password": ""
}
```
**Response** 
`200`
```json
{
	"url": "http://peer1.ky2chain.com" // 생성된 노드의 주소
}
```
### Start Peer
피어노드를 시작합니다.  
**Request**
`POST` `/v1/peer/start`
```json
{
	"id": "peer1"
	"password": "",
}
```
**Response** 
`200`
```json
{
	"url": "http://peer1.ky2chain.com" // 시작된 노드의 주소
}
```

### Delete Peer
노드를 삭제합니다.
**Request**
`DELETE` `/v1/peer/:id`
**Response** 
`200`
```json
{
	"meesage" : "clearly delete node!!"
}
```
## REST API ( Peer )
피어노드는 Docker 를 통해서 실행되며 카프카와 연결되어 블록을 다른 노드들과 주고받습니다. 데이터베이스는 Couchbase 에 저장됩니다.

### Get Blocks
블록을 조회할 때 사용하는 API 입니다.

**Request**
`GET` `/v1/block?user=USERID`
```shell
curl -i -H 'Accept: application/json' http://localhost:7000/v1/block?user=USERID
```
**Response**
```json
{
  "blocks": [
	  {
        "_type": "Block",
        "data": {
			"result": "S",
			"user": "eunsol", // 사용자
			"issue_id": "체력측정" // 측정과목
		},
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
        "data" {
			"result": "S",
			"user": "eunsol", // 사용자
			"issue_id": "체력측정" // 측정과목
		}
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
  ]
```
### Add Block
**Request**
`POST` `/v1/block/`
```json
{
	"data": {
		"result": "S",
		"user": "eunsol", // 사용자
		"issue_id": "체력측정" // 측정과목
	}
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
      "result": "S",
      "user": "eunsol",
      "issue_id": "체력측정"
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