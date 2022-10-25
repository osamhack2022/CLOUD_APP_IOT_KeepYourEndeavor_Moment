
# /issue
## /issue/regist [POST]
### 이슈 등록 라우터입니다.
이슈를 등록합니다.  

해당 이슈의 타입과 과목에 대한 기준이 존재하면 존재한다고, 없다면 생성하라고 resultOfStandard 로 내용이 넘어옵니다.  

해당 subject에 대해 기준을 변경하고 싶으면 이슈 라우터에서 삭제 후 재생성 해야합니다.  


#### JSON으로 요청 해주세요
```json
curl --location --request POST 'https://api-server.run.goorm.io/issue/regist' \ 

{
	"type" : "측정시험",
	"subject" : "테스트",
	"mandatory" : "1"
}
```
##### 필수 응시과목일 경우 mandatory = "1" , 아닐경우 "0"

---
#### 응답 내용

##### 성공, 기준 생성이 불필요할 때 status : 200

```json
{
	"message": "issue 등록이 완료됐습니다.",
	"issueId": "x0APItSlm9LBoGKN",
	"resultOfStandard": "기준은 이미 생성돼 있습니다. 수정을 원할 시 standard route에서 삭제 후 생성해주세요",
	"mandatory": "1"
}
```
---

##### 성공, 기준을 생성했을 때 status : 200

```json
{
	"message": "issue 등록이 완료됐습니다.",
	"issueId": "pC3zF3oyqpV5x3T7",
	"resultOfStandard": "요청하신 내용대로 기준을 생성했습니다.",
	"mandatory": "1"
}
```
---

##### 이슈 정보가 잘못됐을 때 stauts : 406
```json
{
	"error": "Not Acceptable",
	"message": "이미 등록된 이슈이거나 잘못된 이슈입니다. 1. 이슈를 새로 등록을 원하실 경우 기존 이슈를 삭제해 주세요. 2. 기준을 새로 생성하시려면 기준을 삭제 후 standard route에서 생성해주세요"
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
			"id": "BSUds+6TLZ8Jqwa",
			"type": "측정시험",
			"subject": "멀리뛰기",
			"issuer_id": "supervisor",
			"mandatory": 1,
			"created_at": "2022-10-19T11:14:00.000Z",
			"updated_at": "2022-10-19T11:14:00.000Z"
		},
		{
			"id": "pC3zF3oyqpV5x3T7",
			"type": "측정시험",
			"subject": "팔굽혀펴기",
			"issuer_id": "supervisor",
			"mandatory": 1,
			"created_at": "2022-10-19T11:37:07.000Z",
			"updated_at": "2022-10-19T11:37:07.000Z"
		},
		{
			"id": "x0APItSlm9LBoGKN",
			"type": "강연",
			"subject": "테스트 강연",
			"issuer_id": "supervisor",
			"mandatory": 1,
			"created_at": "2022-10-19T11:40:12.000Z",
			"updated_at": "2022-10-19T11:40:12.000Z"
		}
	]

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
			"id": "eHUl6qaWclHeij7G",
			"type": "측정시험",
			"subject": "윗몸일으키기",
			"issuer_id": "supervisor",
			"created_at": "2022-10-13T23:29:17.000Z",
			"updated_at": "2022-10-13T23:29:17.000Z"
		}
	],
	"standard": {
		"2급": "13:55",
		"3급": "15:00",
		"특": "13:10",
		"1급": "13:30"
	}
}
```
---

##### 이슈는 살아있으나 기준이 삭제됐을 경우 status : 406
```json
{
	"error": "Not Acceptable",
	"message": "이슈는 살아있으나 기준이 삭제된 이슈입니다. 1. 해당 이슈를 삭제 후 재생성 해주세요 2. 기준을 재생성 해주세요"
}
```

##### 실패시 stauts : 406
```json
{
    "error": "Not Acceptable",
    "message": "잘못된 이슈 정보입니다."
}
```

## /issue/:issueId/ [DELETE]
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