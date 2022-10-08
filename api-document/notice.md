# /notice
## /notice/regist [POST]  매니저 이상
### 공지 등록 라우터입니다.

#### body에 넣어주세요 
```bash
curl --location --request POST 'https://api-server.run.goorm.io/notice/regist/' \
 --data-urlencode 'title=테스트공지3' \ 
 --data-urlencode 'issue_id=이슈아이디' \ 
 --data-urlencode 'test_date=2022-10-17 17:30:00' \ 
 --data-urlencode 'apply_date=2022-10-12 15:30:00' \ 
 --data-urlencode 'description=테스트입니다.'
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
##### 실패시 stauts : 500

```json
{
    "error" : "Interval server Error", 
    "message": "예기치 못한 에러가 발생했습니다."
}
```
## /notice/ [GET] 제한 없음
### 모든 공지들을 보여주는 라우터입니다.

#### 여기로 요청을 보내주세요
```bash
curl --location --request GET 'https://api-server.run.goorm.io/notice/'
```
---
#### 응답 내용

##### 성공시 status : 200

```json
{
    "message" : "등록된 notice들을 성공적으로 전송했습니다.",
    "notices" : rowNotice
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
```bash
curl --location --request GET 'https://api-server.run.goorm.io/notice/:noticeId'
```
---

#### 응답 내용
##### 성공시 status : 200

```json
{
    "message" : "등록된 notice들을 성공적으로 전송했습니다.",
    "notice" : rowNotice
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

## /notice/:noticeId/delete [POST] 매니저 이상
### 공지 삭제 라우터입니다.
#### 여기로 요청을 보내주세요
```bash
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
#### body에 넣어주세요
```bash
curl --location --request POST 'https://api-server.run.goorm.io/notice/GEqwQmOImWNSQcW/edit' \ 
--data-urlencode 'description=테스트용으로 한번 수정해볼게요'
```
##### 수정사항 : 수정하기 원하는 정보의 key 값과 value값만 넘겨주시면 됩니다.
##### 수정 가능한 key 목록 = `title`, `issue_id`, `test_date`, `apply_date`, `description`
---

#### 응답 내용
##### 성공시 status : 200

```json
{
    "message":"보내주신 내용대로 업데이트에 성공했습니다!"
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
