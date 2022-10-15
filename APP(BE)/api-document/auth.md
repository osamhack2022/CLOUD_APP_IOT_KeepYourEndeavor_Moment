
# /auth 
## /auth/signup [POST] 제한 없음
### 회원가입 라우터입니다.
회원 가입의 기능과 더불어 해당 USER의 PEER에 해당하는 컨테이너를 생성 및 실행하는 기능도 담당합니다.

id와 pwd는 필수입니다. 프론트 단에서 하이라이트해주세요.
소속명을 하나도 기입하지 않을 경우에 에러가 발생합니다.

#### JSON으로 요청해주세요
```bash
curl --location --request POST 'https://api-server.run.goorm.io/auth/signup/' \ 

{
"id": "supervisor",
"pwd": "********",
"class" : "중사",
"name" : "이상순",
"authority" : "개설자",
"position" : "교육훈련지원부사관",
"cmd" : "제2작전사령부",
"cps" : "",
"division" : "39사단",
"br" : "117여단",
"bn" : "12대대",
"co" : "작전과",
"etc" : ""
}

```
##### authority 예시 :  **`(군무원, 병사, 간부, 등록자, 개설자)`**
##### 군무원, 병사, 간부 : 일반 등급 
##### 등록자 : 매니저
##### 개설자 : 개설자
---
#### 응답 내용
##### 성공시 stauts : 200
```json
{
	"message": "회원가입에 성공했습니다. 회원의 비밀번호는 암호화 처리됩니다.",
	"issue": "암호화 시간이 조금 소요될 수 있으니 기다려주세요.",
	"peer_url": "http://supervisor.jerrykang.com 가 생성됐습니다."
}
```

---
##### 누락한 회원정보가 있을 때 status : 406

```json
{
    "error": "Not Acceptable",
    "message": "회원 정보 중 누락된 부분이 있습니다."
}
```
---

##### 실패시 status : 406

```json
{
    "error": "Not Acceptable",
    "message": "올바르지 않은 회원 정보입니다."
}
```

## /auth/signin [POST] 제한 없음
### 로그인 라우터입니다.
peer 컨테이너 실행 기능도 담당합니다.
#### JSON으로 요청해주세요
```bash
curl --location --request POST 'https://api-server.run.goorm.io/auth/signin' \ 

{
	"id" : "supervisor",
	"pwd" : "1q2w3e4r"
}

```
---
#### 응답 내용
##### 성공시 stauts : 200

```json
{

"message": "로그인 성공! 토큰은 DB에 저장되어 관리됩니다. 로그인 유효시간은 6시간 입니다.",
"issue": "암호화 시간이 조금 소요될 수 있으니 기다려주세요.",
"token": "대충 토큰 내용",
"start_result": "1"

}
```

###### start_peer.data 성공시 1, 실패시 undefined


---

##### peer 시작에 실패할 때 status : 500
```json
{
	"error": "Interval server Error",
	"message": "peer 시작에 실패했습니다. 다시 로그인 해주세요."
}
```

---

##### 비밀번호 미일치 status : 406

```json
{
    "error": "Not Acceptable",
    "message": "비밀번호가 일치하지 않습니다."
}
```
---
##### 아이디 미일치 stauts : 406

```json
{
    "error": "Not Acceptable",
    "message": "회원 가입되지 않은 회원입니다."
}
```

## /auth/logout [POST] 제한 없음
### 로그아웃 라우터입니다.

#### 이 곳으로 요청을 보내주세요 
```bash
curl --location --request POST 'https://api-server.run.goorm.io/auth/logout'
```
---
#### 응답 내용

##### 성공시 stauts : 200
```json
{
    "message": "로그아웃 되었습니다."
}
```
---
##### 실패시 status : 406

```json
{
    "error": "Unauthorized HTTP",
    "message": "유효하지 않은 토큰입니다."
}
```

로그아웃 된 유저가 다시 로그아웃 라우터에 접근시 미들웨어가 이를 차단합니다.

---

##### 서버 내부에서 오류 발생 status : 500

```json
{
    "error": "Interval server Error",
    "message" : "예기치 못한 에러가 발생했습니다."
}
```