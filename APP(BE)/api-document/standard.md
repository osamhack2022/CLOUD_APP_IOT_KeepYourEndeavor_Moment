# /standard
## /standard/ [GET] 개설자 가능
### 기준을 가져오는 라우터입니다.
아래와 같은 형식으로 응답을 반환합니다. 아래 정보를 이용해 기준을 삭제 할 수 있습니다.
```json
"collection" : {
    "doc1" : {},
    "doc2" : {},
    ,,,
}
```

#### 여기에 요청해 주세요
```bash
curl --location --request GET 'https://api-server.run.goorm.io/standard/'
```

---
#### 응답 내용

##### 성공시 status : 200

```json
{
    "message": "standard 들을 모두 보냅니다",
    standards
}
```

---
##### 실패 시 status : 500

```json
{
    "error": "Interval server Error",
    "message" : "예기치 못한 에러가 발생했습니다."
}
```

## /standard/delete [POST] 개설자 가능
### 기준삭제 라우터입니다.
/ 에서 가져온 기준 정보로 기준을 삭제할 수 있습니다.
#### body에 넣어주세요 
```bash
curl --location --request POST 'https://api-server.run.goorm.io/standard/delete' \
--data-urlencode 'collection=측정시' \
--data-urlencode 'doc=팔굽혀펴기'
```
---
#### 응답 내용

##### 성공시 status : 200
```json
{
    "message" : "성공적으로 기준을 삭제했습니다."
}
```
---
##### COLLECTION이나 DOC의 이름을 하나라도 입력하지 않았을 경우 STATUS : 406

```json
{
    "error":"Not Acceptable",
    "message" : "collection과 doc의 이름을 모두 입력하셔야 합니다."
}
```

---
##### 입력한 내역에 대한 기준이 존재하지 않을 경우 STATUS : 406

```json
{
    "error":"Not Acceptable", 
    "message" : "입력하신 collection과 doc의 이름에 해당하는 standard가 존재하지 않습니다."
}
```

---
##### 실패시 STAUTS : 500

```json
{
  "error": "Interval server Error",
  "message": "예기치 못한 에러가 발생했습니다."
}
```
