# /profile
## /profile/edit [POST] 제한 없음
### 사용자 정보 수정 라우터입니다.

#### body에 넣어주세요 
```bash
curl --location --request POST 'https://api-server.run.goorm.io/profile/edit' \ 
--data-urlencode 'class=소장'
```
##### 수정사항 : 수정하기 원하는 정보의 key 값과 value값만 넘겨주시면 됩니다.
##### 수정 가능한 key 목록 = `pwd`, `class`, `name`, `authority`, `position`, `cmd`, `cps`, `division`, `br`, `bn`, `co`, `etc`

---
#### 응답 내용

##### 성공시 status : 200

```json
{
    "message": "보내주신 내용대로 업데이트에 성공했습니다!"
}
```

---
##### 올바르지 않은 column 이름일 시 status : 500

```json
{
    "error": "Internal Server Error",
    "message": " Client request key is not matched to the db column name. "
}
```

## /profile/delete [POST] 제한 없음
### 회원탈퇴 라우터입니다.
token을 이용해 회원 탈퇴를 진행하기 때문에 사용자가 잘못 입력한 데이터에 의해 에러가 발생하지 않습니다.
#### body에 넣어주세요 
```bash
curl --location --request POST 'https://api-server.run.goorm.io/profile/delete'
```
---
#### 응답 내용

##### 성공시 status : 200
```json
{
    "message": "회원 탈퇴가 완료됐습니다. 로그아웃합니다."
}
```
---
##### 예상치 못한 에러 발생시 status : 500

```js
res.status(500).json({
    error: "Internal Server Error",
    message: err.message
})
```