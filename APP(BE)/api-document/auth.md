# /auth 
## /auth/signup [POST] 제한 없음
### 회원가입 라우터입니다.
회원 가입의 기능과 더불어 해당 USER의 PEER에 해당하는 컨테이너를 생성 및 실행하는 기능도 담당합니다.

#### body에 넣어주세요 
```bash
curl --location --request POST 'https://api-server.run.goorm.io/auth/signup/' \ 
--data-urlencode 'id=user10' \ 
--data-urlencode 'pwd=1q2w3e4r' \ 
--data-urlencode 'class=일병' \ 
--data-urlencode 'name=아무개' \ 
--data-urlencode 'authority=병사' \ 
--data-urlencode 'position=소총수' \ 
--data-urlencode 'cmd=제2작전사령부' \ 
--data-urlencode 'cps=' \ 
--data-urlencode 'division=00사단' \ 
--data-urlencode 'br=00여단' \ 
--data-urlencode 'bn=00대대' \ 
--data-urlencode 'co=00중대' \ 
--data-urlencode 'etc=통신소대'
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
    "start_url": "http://20-500123.jerrykang.com 가 생성됐습니다.",
    "start_result": "1"
}
```
###### peer_url.data.url 예시 :  **`http://peer1.jerrykang.com`**
###### start_peer.data 예시 :  **`1`**
---
##### 실패시 status : 406

```json
{
    "error": "Not Acceptable",
    "message": "잘못된 회원 정보입니다."
}
```

## /auth/signin [POST] 제한 없음
### 로그인 라우터입니다.

#### body에 넣어주세요 
```bash
curl --location --request POST 'https://api-server.run.goorm.io/auth/signin' \ 
--data-urlencode 'id=유저아이디' \ 
--data-urlencode 'pwd=비밀번호'
```
---
#### 응답 내용
##### 성공시 stauts : 200

```json
{
    "message": "로그인 성공! 토큰은 DB에 저장되어 관리됩니다. 로그인 유효시간은 6시간 입니다.",
    "issue": "암호화 시간이 조금 소요될 수 있으니 기다려주세요.",
    "token": "사용자 id , 사용자 권한, 사용자의 peer 도메인이 암호회 되어 응답됩니다."
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

```js
res.status(500).json({
    error: "Interval server Error",
    message : "예기치 못한 에러가 발생했습니다."
    });
```