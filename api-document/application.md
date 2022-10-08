# /application
## /application/ [GET]
### 모든 공지에 대한 신청자 목록을 보여주는 라우터입니다.

#### 여기에 요청해 주세요
```json
curl --location --request GET 'https://api-server.run.goorm.io/application/'
```

---
#### 응답 내용
##### 성공시 stauts : 200
```json

{
    "message": "현재 신청내역에 있는 모든 인원 현황입니다",
    "members": [
        {
            "rep_id": "supervisor",
            "members": [
                "21-44444444",
                "21-55555555",
                "21-66666666",
                "21-12345678"
            ],
            "message": "대표신청글  테스트 입니다."
        }
    ]
}
```

---

##### 실패시 status : 500
```json
    
{
    "error": "Interval server Error",
    "message" : "예기치 못한 에러가 발생했습니다. "
}
```

## /application/:noticeId [GET]
### 특정 공지에 대한 신청자 목록을 보여주는 라우터입니다.

#### 여기에 요청해 주세요
```json
curl --location --request GET 'https://api-server.run.goorm.io/application/:noticeId'
```

---
#### 응답 내용
##### 성공시 status : 200
```json
{
    "message": "해당 공지에 신청한 인원 현황입니다",
    "members": [
        {
            "rep_id": "supervisor",
            "members": [
                "21-44444444",
                "21-55555555",
                "21-66666666",
                "21-12345678"
            ],
            "message": "대표신청글  테스트 입니다."
        }
    ]
}
```
---
##### 실패시 status : 500

```json
{
    "error": "Interval server Error",
    "message" : "예기치 못한 에러가 발생했습니다. "
}
```

## /application/:noticeId/regist [POST]
### 특정 공지에 대해 신청하는 라우터입니다.
신청시 대표 신청자란은 반드시 채워져야 하나 해당 공지에 해당하는 과목에 신청할 의무는 없습니다.

#### body에 넣어주세요
```json
curl --location --request POST 'https://api-server.run.goorm.io/application/:noticeId/regist' \ 
--data-urlencode 'members={"members" : ["21-44444444","21-55555555","21-66666666","21-12345678"]}' \ 
--data-urlencode 'message=대표신청글 테스트 입니다.'
```
##### members 는 JSON 형식으로 보내주세요.
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

```json
{
    "error": "Interval server Error",
    "message" : "예기치 못한 에러가 발생했습니다. "
}
```
## /application/:noticeId/edit [POST]
### 특정 공지에 대한 신청을 수정하는 라우터입니다.

대표 아이디로 로그인해야 수정이 가능합니다.

#### body에 넣어주세요
```json
curl --location --request POST 'https://api-server.run.goorm.io/application/i79Vu13SaLVshbY6/edit' \ 
--data-urlencode 'members={"members" : ["21-44444444","21-55555555","21-66666666","21-12345678"]}' \ 
--data-urlencode 'message=수정할거임!'
```
##### members 는 JSON 형식으로 보내주세요.
---
#### 응답 내용
##### 성공시 status : 200
```json
{
    "message": "보내주신 내용대로 업데이트에 성공했습니다!"
}
```
---
##### 대표 신청자가 아닌데 공지에 해당하는 신청 내역을 수정하려 할 때 status : 406

```json
{
	"error": "Not Acceptable",
	"message" : "대표 신청자 아이디로 로그인 해주십시오."
}
```
---
##### 잘못된 컬럼 이름으로 수정 시도시 status : 406

```js
throw new Error('Client request key is not matched to the db column name.');
// 에러 스로우
```
---
##### 실패시 status : 500

```json
{
    "error": "Interval server Error",
    "message" : "예기치 못한 에러가 발생했습니다. "
}
```
## /application/:noticeId/delete [POST]
### 특정 공지에 대한 신청을 삭제하는

대표 아이디로 신청한 모든 신청을 해당 공지에서 삭제합니다

#### 여기에 요청해 주세요
```json
curl --location --request POST 'https://api-server.run.goorm.io/application/:noticeId/delete'
```
---
#### 응답 내용
##### 성공시 status : 200

```json
{
    "message": "대표신청자가 공지에 신청한 내역을 모두 삭제했습니다."
}

```
---
##### 공지 번호와 로그인한 사용자가 대표신청자관계가 아닐 시 status : 406

```json
{
    "error" : "Not Acceptable", 
    "message" : "공지번호와 대표신청자의 정보가 연관성이 있는지 확인하세요."
}
```
---
##### 실패시 status : 500

```json
{
    "error": "Interval server Error",
    "message" : "예기치 못한 에러가 발생했습니다. "
}
```