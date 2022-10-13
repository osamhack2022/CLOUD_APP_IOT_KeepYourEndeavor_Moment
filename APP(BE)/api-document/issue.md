# /issue
## /issue/regist [POST]
### 이슈 등록 라우터입니다.
이슈를 등록합니다.  

해당 이슈의 타입과 과목에 대한 기준이 존재하면 존재한다고, 없다면 생성하라고 resultOfStandard 로 내용이 넘어옵니다.  

해당 subject에 대해 기준을 변경하고 싶으면 이슈 라우터에서 삭제 후 재생성 해야합니다.  

#### body에 넣어주세요 
```json
curl --location --request POST 'https://api-server.run.goorm.io/issue/regist' \ 
--data-urlencode 'type=test' \ 
--data-urlencode 'subject=팔굽혀펴기' \ 
```

---
#### 응답 내용

##### 성공시 status : 200

```json
{
    "message": "issue 등록이 완료됐습니다.",
    "issueId": "Issue ID가 들어갑니다",
    "resultOfStandard" : "기준이 있다면 있다고, 없다면 어떻게 만들어야 하는지에 대해서 알려줍니다." 
}
```
---

##### 이슈 정보가 잘못됐을 때 stauts : 406
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
``` json
{
    "error": "Interval server Error",
    "message" : "예기치 못한 에러가 발생했습니다."
}
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
```json
{
    "error": "Internal Server Error",
    "message": "예기치 못한 에러가 발생했습니다."
}
```