# /issue
## /issue/regist [POST]
### 이슈 등록 라우터입니다.
이슈와 함께 해당 이슈에 해당하는 점수 기준도 함께 업로드합니다. <br>

**중요! 이미 이전에 같은 subject를 등록한 이력이 있으면 사용자가 이슈 등록 라우터에서 보낸 점수 기준은 무시됩니다.** <br>

해당 subject에 대해 기준을 변경하고 싶으면 **이슈 변경 라우터** 로 이동합니다.

#### body에 넣어주세요 
```json
curl --location --request POST 'https://api-server.run.goorm.io/issue/regist' \ 
--data-urlencode 'type=test' \ 
--data-urlencode 'subject=팔굽혀펴기' \ 
--data-urlencode 'standard={
"special_grade":"80",
"first_grade":"75",
"second_grade":"50",
"third_grade":"40",
"fail_grade":"20"
}'
```
##### standard type :  json 으로 보내주세요.
##### standard는 5개급수 (특, 1,2,3, FAIL), 이수/미이수로만 이루어집니다.
---
#### 응답 내용

##### 성공시 status : 200

```json
{
    "message": "issue 등록이 완료됐습니다.",
    "issueId": "Issue ID가 들어갑니다"
}
```
---

##### 실패시 stauts : 406
```json
{
    "error": "Not Acceptable",
    "message": "잘못된 이슈 정보입니다."
}
```

## /issue/ [GET]
### 모든 이슈를 가져오는 라우터입니다.
#### 이 곳으로 요청을 보내주세요 
```json
curl --location --request GET 'https://api-server.run.goorm.io/issue/'
```
---
#### 응답 내용
##### 성공시 status : 200
```json
{
    "message": "등록된 issue들을 성공적으로 전송했습니다.",
    "issues": [
        {
            "id": "OvEuiS6MscL+J99q",
            "type": "test",
            "subject": "팔굽혀펴기",
            "issuer_id": "supervisor",
            "created_at": "2022-10-06T23:10:07.000Z",
            "updated_at": null
        }
    ]
}
```
---

##### 실패시 status : 500
``` js
res.status(500).json({
    error: "Interval server Error",
    message : "예기치 못한 에러가 발생했습니다."
});
```

## /issue/:issueId [GET]
### 특정 이슈의 정보를 가져오는 라우터입니다.

#### 이 곳으로 요청을 보내주세요 
```json
curl --location --request GET 'https://api-server.run.goorm.io/issue/:issueId'
```
---
#### 응답 내용


##### 성공시 status : 200
```json
{
    "message": "등록된 issue를 성공적으로 전송했습니다.",
    "issue": [
        {
            "id": "OvEuiS6MscL+J99q",
            "type": "test",
            "subject": "팔굽혀펴기",
            "issuer_id": "supervisor",
            "created_at": "2022-10-06T23:10:07.000Z",
            "updated_at": null
        }
    ],
    "standard": {
        "fail_grade": {
            "stringValue": "20",
            "valueType": "stringValue"
        },
        "special_grade": {
            "stringValue": "80",
            "valueType": "stringValue"
        },
        "first_grade": {
            "stringValue": "75",
            "valueType": "stringValue"
        },
        "third_grade": {
            "stringValue": "40",
            "valueType": "stringValue"
        },
        "second_grade": {
            "stringValue": "50",
            "valueType": "stringValue"
        }
    }
}

```
---

##### 실패시 stauts : 406
```json
{
    "error": "Not Acceptable",
    "message": "잘못된 이슈 정보입니다."
}
```
## /issue/:issueId/edit [POST]
###  이슈와 과목의 기준을 변경하는 라우터입니다.
type과 subject만 변경하고, 기준은 변경하고 싶지 않을 땐, 기준을 **빈 데이터**로 보내주시면 됩니다.

#### body에 넣어주세요
```json
curl --location --request POST 'https://api-server.run.goorm.io/issue/:issueId/edit' \ 
--data-urlencode 'type=test' \ 
--data-urlencode 'subject=뜀걸음' \ 
--data-urlencode 'standard={"first_grade":"66"}'
```
##### standard 예시 : 빈데이터 = {} , 나머지는 {"변경하고자 하는 등급" : "기준"}
---
#### 응답 내용
##### 성공시 status : 200

```json
{
    "message": "보내주신 내용대로 업데이트에 성공했습니다!"
}
```
---

##### 실패시 status : 500
``` js
res.status(500).json({
    error: "Internal Server Error",
    message: err.message
})
```
## /issue/:issueId/delete [POST]
### 이슈 삭제 라우터입니다.
#### 이 곳으로 요청을 보내주세요 
```json
curl --location --request POST 'https://api-server.run.goorm.io/issue/:issueId/delete'
```
---

#### 응답 내용

##### 성공시 status : 200

```json
{
    "message": "이슈 삭제가 완료됐습니다."
}
```
---
##### 존재하지 않는 이슈 넘버 적용 시 status : 406

```json
{
    "error": "Not Acceptable",
    "message": "존재하지 않는 이슈 넘버입니다."
}
```
---
##### 실패시 status : 500
```js
res.status(500).json({
    error: "Internal Server Error",
    message: err.message
})
```