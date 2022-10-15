
# /application
## /application/ [GET] 제한없음
### 모든 공지에 대한 신청자 목록을 보여주는 라우터입니다.

#### 여기에 요청해 주세요
```bash
curl --location --request GET 'https://api-server.run.goorm.io/application/'
```

---
#### 응답 내용
##### 성공시 stauts : 200
```json
{
	"message": "현재 신청내역이 있는 모든 인원 현황입니다",
	"applicants": [
		{
			"rep_id": "supervisor",
			"members": [
				{
					"bn": "12대대",
					"br": "117여단",
					"co": "본부중대",
					"cmd": "제2작전사령부",
					"cps": "",
					"etc": "통신소대",
					"class": "병장",
					"user_id": "21-76045920",
					"division": "39사단",
					"user_name": "반영환",
					"created_at": "2022-10-12T23:15:11.000Z",
					"updated_at": "2022-10-12T23:15:11.000Z"
				}
			],
			"message": "테스트 공지에요"
		},
		{
			"rep_id": "supervisor",
				"members": [
					{
						"bn": "12대대",
						"br": "117여단",
						"co": "본부중대",
						"cmd": "제2작전사령부",
						"cps": "",
						"etc": "통신소대",
						"class": "병장",
						"user_id": "21-76045920",
						"division": "39사단",
						"user_name": "반영환",
						"created_at": "2022-10-12T23:15:11.000Z",
						"updated_at": "2022-10-12T23:15:11.000Z"
					}
				],
			"message": "테스트 공지에요"
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

## /application/:noticeId [GET] 제한 없음
### 특정 공지에 대한 신청자 목록을 보여주는 라우터입니다.

#### 여기에 요청해 주세요
```bash
curl --location --request GET 'https://api-server.run.goorm.io/application/:noticeId'
```

---
#### 응답 내용
##### 성공시 status : 200
```json
{
	"message": "해당 공지에 신청한 인원 현황입니다",
	"info": [
		{
			"rep_id": "supervisor",
			"members": [
				{
					"bn": "멋진대대",
					"br": "돌격여단",
					"co": "엄청난 중대",
					"cmd": "지상작전사령부",
					"cps": "",
					"etc": "화상회의하는곳",
					"class": "병장",
					"user_id": "21-76040179",
					"division": "짱쌘사단",
					"user_name": "강은솔",
					"created_at": "2022-10-12T23:17:20.000Z",
					"updated_at": "2022-10-12T23:17:20.000Z"
				},
				{
					"bn": "12대대",
					"br": "117여단",
					"co": "본부중대",
					"cmd": "제2작전사령부",
					"cps": "",
					"etc": "통신소대",
					"class": "병장",
					"user_id": "21-76045920",
					"division": "39사단",
					"user_name": "반영환",
					"created_at": "2022-10-12T23:15:11.000Z",
					"updated_at": "2022-10-12T23:15:11.000Z"
				}
			],
			"message": "이원혁 병장 제외해서 다시 신청합니다. 본부 2분대입니다."
			}
		],

		"message": "이원혁 병장 제외해서 다시 신청합니다. 본부 2분대입니다."
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

## /application/:noticeId/regist [POST] 제한 없음
### 특정 공지에 대해 신청하는 라우터입니다.
신청시 대표 신청자란은 반드시 채워져야 하나 해당 공지에 해당하는 과목에 신청할 의무는 없습니다.

#### JSON으로 요청 해주세요
```bash
curl --location --request POST 'https://api-server.run.goorm.io/application/:noticeId/regist' \ 

{
	"members" : ["21-76045920"],
	"message" : "테스트 공지에요"
}

```
---
#### 응답 내용
##### 성공시 status : 200

```json
{
    "message": "보내주신 내용대로 업데이트에 성공했습니다!",
    "members": [
		{
			"user_id": "21-76045920",
			"cmd": "제2작전사령부",
			"cps": "",
			"division": "39사단",
			"br": "117여단",
			"bn": "12대대",
			"co": "본부중대",
			"etc": "통신소대",
			"created_at": "2022-10-12T23:15:11.000Z",
			"updated_at": "2022-10-12T23:15:11.000Z",
			"user_name": "반영환",
			"class": "병장"
		}
	]
}
```
---
##### 공지 아이디가 잘못됐을 때 status : 406
```json
{
	"error" : "Not Acceptable", 
	"message": "잘못된 공지 정보입니다."
}
```
---

##### 신청자 목록에 가입되지 않은 신청자가 있을 때 status : 406
```json
{
		"error" : "Not Acceptable", 
		"message": "신청자 목록에 존재하지 않는 유저가 있습니다."
}
```
---



##### 요청 데이터 형식이 이상할 때 status : 406

```json
{
    "error": "Not Acceptable",
    "message" : "요청 데이터의 형식이 잘못됐습니다. 요청 JSON을 확인해주세요."
}
```
## /application/:noticeId/edit [POST] 제한 없음
### 특정 공지에 대한 신청을 수정하는 라우터입니다.

대표 아이디로 로그인해야 수정이 가능합니다.

#### JSON으로 요청 해주세요
```bash
curl --location --request POST 'https://api-server.run.goorm.io/application/i79Vu13SaLVshbY6/edit' \ 

{
	"members" : ["21-76040179","21-76045920"],
	"message" : "이원혁 병장 제외해서 다시 신청합니다. 본부 2분대입니다."
}

```
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

##### 공지 아이디가 잘못됐을 때 status : 406
```json
{
	"error" : "Not Acceptable", 
	"message": "잘못된 공지 정보입니다."
}
```
---

##### 잘못된 컬럼 이름으로 수정 시도시 status : 406

```js
throw new Error('Client request key is not matched to the db column name.');
// 에러 스로우
```
---

##### 신청자 목록에 가입되지 않은 신청자가 있을 때 status : 406
```json
{
		"error" : "Not Acceptable", 
		"message": "신청자 목록에 존재하지 않는 유저가 있습니다."
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
## /application/:noticeId/ [DELETE] 제한 없음
### 특정 공지에 대한 신청을 삭제하는

대표 아이디로 신청한 모든 신청을 해당 공지에서 삭제합니다

#### 여기에 요청해 주세요
```bash
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