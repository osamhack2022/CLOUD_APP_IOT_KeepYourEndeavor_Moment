# /notice
## /notice/regist [POST]  매니저 이상
### 공지 등록 라우터입니다.

#### JSON으로 요청 해주세요
```json
curl --location --request POST 'https://api-server.run.goorm.io/notice/regist/' \

{
	"title" : "정기 3차 테스트 시험 공지",
	"issue_id" : "wA3JudX7xpBMAhI9",
	"manager_id" : "supervisor",
	"test_date" : "2022-10-30 17:30:00",
	"apply_date" : "2022-10-27 15:30:00",
	"description" : "테스트 공지입니다람쥐 선더 볼트"
}

```
**`test_date`** 는 **`apply_date`** 보다 3일 앞서야 합니다.

---
#### 응답 내용
##### 성공시 status : 200

```json
{
    "message":"공지를 성공적으로 등록했습니다."
}
```
---

##### 중복된 공지 아이디 혹은 이슈아이디가 잘못일 경우 status : 406

```json
{
	"error" : "Not Acceptable", 
    "message":"중복된 공지 이름이거나 이슈 아이디가 잘못됐습니다."
}
```
---
##### 날짜 형식이 잘못되었을 경우 status : 406

```json
{
    "error" : "Not Acceptable", 
    "message": "잘못된 날짜 정보입니다. 형식을 지켜주세요. `YYYY-M-D H:m:s`"
}
```
---
##### 현재 시간보다 이전 시간을 공지 연관 시간으로 설정할 경우 status : 406

```json
{
    "error" : "Not Acceptable", 
    "message": "현재보다 이전 값을 공지 연관 신청일로 사용할 수 없습니다."
}
```
---
##### 시험 실시일과 신청일의 시간 간격을 지키지 않을 경우 status : 406

```json
{
    "error" : "Not Acceptable", 
    "message": "시험 날은 신청 날보다 최소 3일 후에 실시되어야 합니다."
}
```

## /notice/ [GET] 제한 없음
### 모든 공지들을 보여주는 라우터입니다.

#### 여기로 요청을 보내주세요
```json
curl --location --request GET 'https://api-server.run.goorm.io/notice/'
```
---
#### 응답 내용

##### 성공시 status : 200

```json
{
    "message" : "등록된 notice들을 성공적으로 전송했습니다.",
    "notices" : {
		"notice_id": "R46H8RjX1Un45jLV",
		"title": "정기 3차 테스트 시험 공지",
		"notice_author_id": "supervisor",
		"test_date": "2022-10-30T17:30:00.000Z",
		"apply_date": "2022-10-27T15:30:00.000Z",
		"notice_created_at": "2022-10-14T22:42:49.000Z",
		"notice_updated_at": "2022-10-14T22:42:49.000Z",
		"description": "테스트 공지입니다람쥐 선더 볼트",
		"issue_id": "wA3JudX7xpBMAhI9",
		"type": "측정시험",
		"subject": "테스트",
		"issuer_id": "supervisor"
	}
}
```

##### 실패시 status : 500

```json
{
    "error" : "Interval server Error", 
    "message": "예기치 못한 에러가 발생했습니다."
}
```

## /notice/:noticeId [GET] 제한 없음
### 특정 공지를 보여주는 라우터입니다.
#### 여기로 요청을 보내주세요
```json
curl --location --request GET 'https://api-server.run.goorm.io/notice/:noticeId'
```
---

#### 응답 내용
##### 성공시 status : 200

```json
{
	"message": "notice를 성공적으로 전송했습니다.",
	"notice": {
		"notice_id": "R46H8RjX1Un45jLV",
		"title": "정기 3차 테스트 시험 공지",
		"notice_author_id": "supervisor",
		"test_date": "2022-10-30T17:30:00.000Z",
		"apply_date": "2022-10-27T15:30:00.000Z",
		"notice_created_at": "2022-10-14T22:42:49.000Z",
		"notice_updated_at": "2022-10-14T22:42:49.000Z",
		"description": "테스트 공지입니다람쥐 선더 볼트",
		"issue_id": "wA3JudX7xpBMAhI9",
		"type": "측정시험",
		"subject": "테스트",
		"issuer_id": "supervisor"
	}
}
```
---
##### 공지 넘버가 잘못됐을 시 status : 406

```json
{
    "error" : "Not Acceptable", 
    "message": "올바르지 않은 공지 넘버 입니다."
}
```
---
##### 실패시 status : 500

```json
{
    "error": "Interval server Error",
    "message" : "예기치 못한 에러가 발생했습니다."
}
```

## /notice/:noticeId/ [DELETE] 매니저 이상
### 공지 삭제 라우터입니다.
#### 여기로 요청을 보내주세요
```json
curl --location --request POST 'https://api-server.run.goorm.io/notice/:noticeId/delete'
```
---

#### 응답 내용
##### 성공시 status : 200

```json
{
    "message":"공지 삭제가 완료됐습니다."
}
```
---
##### 공지 넘버가 틀렸을 시 status : 406

```json
{
        "error" : "Not Acceptable", 
        "message": "존재하지 않는 공지 넘버입니다."
}
```
---
##### 실패시 status : 500

```json
{
    "error": "Interval server Error",
    "message" : "예기치 못한 에러가 발생했습니다."
}
```
## /notice/:noticeId/edit [POST] 매니저 이상
### 공지 수정 라우터입니다.
#### JSON으로 요청 해주세요
```json
curl --location --request POST 'https://api-server.run.goorm.io/notice/:noticeId/edit' \ 

{
	"title" : "테스트 공지를 수정합니다.",
	"test_date" :"",
	"apply_date" : "",
	"description" : ""
}

```
##### 수정사항 : 수정하기 원하는 정보의 key 값과 value값만 넘겨주시면 됩니다.
##### 수정 가능한 key 목록 = `title, `test_date, `apply_date, `description
##### 수정하지 않을 내용은 ""로 보내주세요

---

#### 응답 내용
##### 성공시 status : 200

```json
{
    "message":"보내주신 내용대로 업데이트에 성공했습니다!"
}
```
---
##### 시험 실시 일자와 시험 신청 일자 둘 중 하나만 수정할 경우 status : 406
```json
{
	"error" : "Not Acceptable", 
	"message" : "시험 실시 일자와 시험 신청 일자는 하나만 변경할 수 없습니다. 두 칸 모두 채워주세요."
}
```
---

##### 날짜 형식이 잘못되었을 경우 status : 406

```json
{
    "error" : "Not Acceptable", 
    "message": "잘못된 날짜 정보입니다. 형식을 지켜주세요. `YYYY-M-D H:m:s`"
}
```
---
##### 현재 시간보다 이전 시간을 공지 연관 시간으로 설정할 경우 status : 406

```json
{
    "error" : "Not Acceptable", 
    "message": "현재보다 이전 값을 공지 연관 신청일로 사용할 수 없습니다."
}
```
---
##### 시험 실시일과 신청일의 시간 간격을 지키지 않을 경우 status : 406

```json
{
    "error" : "Not Acceptable", 
    "message": "시험 날은 신청 날보다 최소 3일 후에 실시되어야 합니다."
}
```
---
##### 컬럼 이름이 맞지 않는 경우 status : 406

```js
throw new Error('Client request key is not matched to the db column name.');
// 에러 스로우
```
---
##### 실패시 status : 500

```json
{
    "error": "Interval server Error",
    "message" : "예기치 못한 에러가 발생했습니다."
}
```
