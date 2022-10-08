# /home
## /home/?user=userId [GET]
### 사용자 시험 현황을 불러오는 라우터입니다.
쿼리문으로 사용자 아이디를 전달받습니다.<br>

#### 여기로 요청해 주세요
```json
curl --location --request GET 'https://api-server.run.goorm.io/home/?user=userId'
```

---
#### 응답 내용


##### 성공시 status : 200
```json
{
    "message" : `${peer} 원장을 가져왔습니다.`,
    "usersData"
}
```
---
##### 실패시 status : 406

```json
{
    "error" : "Not Acceptable", 
    "message" : `${peer} 원장이 존재하지 않습니다.`
}
```