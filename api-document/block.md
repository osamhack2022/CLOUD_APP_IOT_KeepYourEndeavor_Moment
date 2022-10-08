# /block
## /block/push [POST]
### 사용자 점수 입력 라우터 입니다.
점수 입력시 블록 체인에 해당 PEER에 자동으로 온체인 됩니다. <br>
등급은 **`이수/미이수`** **`특/1급/2급/3급/FAIL`** 로 통일합니다.
#### body에 넣어주세요
```json
curl --location --request POST 'https://api-server.run.goorm.io/block/push' \ 
--data-urlencode 'user=user10' \ 
--data-urlencode 'record=10:01' \ 
--data-urlencode 'issue_id=issueId'
```

---
#### 응답 내용

##### 성공시 status : 200
```json
{
    "message" : `${peer}에 해당 데이터를 온체인 시켰습니다.`,
    userRecord
}
```
---

##### issue가 개설되지 않은 과목에 점수를 기입하려 할 시 status : 406

```json
{
    "error" : "Not Acceptable", 
    "message" : "등록되지 않은 issue에 대한 온체인 요청입니다."
}
```
---

##### 블록체인단 관련 정보가 문제일 때 status : 406

```json
{
    "error" : "Not Acceptable", 
    "message" : `${res.peerInfo} 가 존재하지 않거나 구동중이지 않습니다.`
}
```