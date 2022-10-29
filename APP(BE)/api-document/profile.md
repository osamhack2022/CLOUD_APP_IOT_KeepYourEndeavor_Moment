# /profile

## 10월 29일 기준 사용되지 않은 라우터이므로 deprecated

<br>
<br><br>
<br><br><br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>


  
## /profile/ [GET] 제한 없음 
### 모든 사용자 정보 요청 라우터입니다.

### 이곳에 요청 해주세요
```bash
curl --location --request GET 'https://api-server.run.goorm.io/profile/' \
```
#### 응답 내용

##### 성공시 status : 200

```json
{
	"message": "요청한 회원 정보들을 보내드립니다.",
	"userInfo": [{
		"user_id": "supervisor",
		"class": "중사",
		"user_name": "이상순",
		"position": "소총수",
		"cmd": "제2작전사령부",
		"cps": "",
		"division": "39사단",
		"br": "117여단",
		"bn": "12대대",
		"co": "작전과",
		"etc": ""
	}]
}
```
---
##### 실패시 status : 500

```json
{
	"error": "Internal Server Error",
	"message": "예상치 못한 에러가 발생했습니다."
}
```
## /profile/:userId [GET] 제한 없음
### 사용자 정보 요청 라우터입니다.

#### 이곳에 요청 해주세요
```bash
curl --location --request GET 'https://api-server.run.goorm.io/profile/:userId' \
```
#### 응답 내용

##### 성공시 status : 200

```json
{
	"message": "요청한 회원 정보를 보내드립니다.",
	"userInfo": {
		"user_id": "supervisor",
		"class": "중사",
		"user_name": "이상순",
		"position": "소총수",
		"cmd": "제2작전사령부",
		"cps": "",
		"division": "39사단",
		"br": "117여단",
		"bn": "12대대",
		"co": "작전과",
		"etc": ""
	}
}
```

---
##### 회원 아이디가 없을 시 status : 406

```json
{
	"error": "Not Acceptable",
	"message": "회원이 존재하지 않습니다."
}
```

---
##### 실패시 status : 500

```json
{
	"error": "Internal Server Error",
	"message": "예상치 못한 에러가 발생했습니다."
}
```

## /profile/edit [POST] 제한 없음
### 사용자 정보 수정 라우터입니다.

#### JSON으로 요청 해주세요
```bash
curl --location --request POST 'https://api-server.run.goorm.io/profile/edit' \ 

{
"pwd" : "",
"class" : "일병",
"name" : "",
"authority" : "",
"position" : "",
"grade_target_id" : "",
"cmd" : "",
"cps" : "",
"division" : "",
"br" : "",
"bn" : "",
"co" : "",
"ect" : ""
}
```
##### 수정사항 : 수정하기 원하는 정보만 채워서 넘겨주세요. key값은 반드시 있어야 합니다.  
##### grade_target_id 는 접근자의 authority가 개설자인 경우에만 등급을 수정할 수 있는데 이 경우 수정을 할 유저의 id 입니다..

---
#### 응답 내용

##### 성공시 status : 200

```json
{
    "message": "보내주신 내용대로 업데이트에 성공했습니다!"
}
```

---

##### 권한이 없는데 권한 수정을 시도할 시 status : 406

```json
{
	"error": "Not Acceptable",
	"message": "개설자만이 권한을 부여할 수 있습니다."
}
```

---


##### 올바르지 않은 column 이름일 시 status : 500

```json
{
    "error": "Internal Server Error",
    "message": "요청 데이터의 형식이 잘못됐습니다. 요청 JSON을 확인해주세요."
}
```

## /profile/ [DELETE] 제한 없음
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

```json
{
    "error": "Internal Server Error",
    "message": "예상치 못한 에러가 발생했습니다."
)
```
