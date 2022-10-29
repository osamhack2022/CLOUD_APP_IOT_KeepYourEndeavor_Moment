
# /standard
## /standard/ [GET] 개설자 가능
### 기준을 가져오는 라우터입니다.
아래와 같은 형식으로 응답을 반환합니다. 아래 정보를 이용해 기준을 삭제 할 수 있습니다.
```json
"collection" : {
    "doc1" : {},
    "doc2" : {},
    ,,,
}
```

#### 여기에 요청해 주세요
```bash
curl --location --request GET 'https://api.ky2chain.com/standard/'
```

---
#### 응답 내용

##### 성공시 status : 200

```json
{

	"message": "standard 들을 모두 보냅니다",

	"standards": {

	"측정시험": [

		{

			"윗몸일으키기": {

				"fail_grade": "20",

				"second_grade": "50",

				"first_grade": "76",

				"special_grade": "80",

				"third_grade": "40"

			}

		},

		{

			"팔굽혀펴기": {

				"special_grade": "80",

				"third_grade": "40",

				"first_grade": "60",

				"fail_grade": "20",

				"second_grade": "50"

			}

		}

	],

	"필기시험": [

		{

			"정신전력": {

				"second_grade": "50",

				"fail_grade": "20",

				"third_grade": "40",

				"first_grade": "75",

				"special_grade": "80"

			}

		}

	],

	"수업": [

		{

			"북한과 나": {

				"FAIL": "FAIL",

				"PASS": "PASS"

			}

		},

		{

			"북한과 남한": {

				"PASS": "PASS",

				"FAIL": "FAIL"

			}

		}

	],

	"강연": []

	}

}
```

---
##### 실패 시 status : 500

```json
{
    "error": "Interval server Error",
    "message" : "예기치 못한 에러가 발생했습니다."
}
```

## /standard/post [POST] 개설자 가능

## 10월 10일 기준 issue/post/ 라우터와 통합으로 deprecated

<br>
<br>
<br>
<br>

### 기준생성 라우터입니다.
`개수/점수 측정이 필요한 시험의 경우`  
```json
{  
"특" : "90",  
"1급" : "80",  
"2급" : "70",  
"3급" : "60"   
}
```

`시간 측정이 필요한 시험의 경우`  
```json
}
"특" : "13:00",  
"1급" : "13:30",  
"2급" : "14:00",  
"3급" : "15:00"  
}
```

`이수/미이수가 필요한 경우`  
```json
{  
"PASS" : "PASS"  
"FAIL" : "FAIL"  
}
```


#### JSON 으로 요청 해주세요
```bash
curl --location --request POST 'https://api.ky2chain.com/standard/post' \ 

{
	"type" : "강연",
	"subject" : "세바퀴",
	"standard" : {"PASS":"PASS","FAIL":"FAIL"}
}

```
---
#### 응답 내용

##### 성공시 status : 200
```json
{
	"message": "기준 생성에 성공했습니다.",
	"standard": {
		"PASS": "PASS",
		"FAIL": "FAIL"
	}
}
```
---
##### Type(collection)의 이름이 잘못됐을 경우 status: 406

```json
{
    "error":"Not Acceptable",
    "message" : "잘못된 type 종류입니다. type의 종류를 확인해주세요"
}
```

---
##### 이미 존재하는 기준일 경우 status: 406

```json
{
    "error":"Not Acceptable", 
    "message" : "이미 존재하는 기준입니다. 변경을 원할 시 삭제 후 재생성해주세요"
}
```

---
##### 실패시 STAUTS : 500

```json
{
  "error": "Interval server Error",
  "message": "예기치 못한 에러가 발생했습니다."
}
```

## /standard/ [DELETE] 개설자 가능
### 기준삭제 라우터입니다.
/ 에서 가져온 기준 정보로 기준을 삭제할 수 있습니다.
#### JSON으로 요청 해주세요
```bash
curl --location --request POST 'https://api.ky2chain.com/standard/delete' \

{
	"collection" : "강연",
	"doc" : "세바퀴"
}

```
---
#### 응답 내용

##### 성공시 status : 200
```json
{
    "message" : "성공적으로 기준을 삭제했습니다."
}
```
---
##### COLLECTION이나 DOC의 이름을 하나라도 입력하지 않았을 경우 status: 406

```json
{
    "error":"Not Acceptable",
    "message" : "collection과 doc의 이름을 모두 입력하셔야 합니다."
}
```

---
##### 입력한 내역에 대한 기준이 존재하지 않을 경우 status: 406

```json
{
    "error":"Not Acceptable", 
    "message" : "입력하신 collection과 doc의 이름에 해당하는 standard가 존재하지 않습니다."
}
```

---
##### 실패시 STAUTS : 500

```json
{
  "error": "Interval server Error",
  "message": "예기치 못한 에러가 발생했습니다."
}
```
