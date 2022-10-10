 <p  align="center">
<a  href="https://github.com/osamhack2022/CLOUD_WEB_IOT_KeepYourEndeavor_Moment"  target="_blank"  rel="noopener noreferrer">
<img width="100px" height = "50px" src='https://github.com/osamhack2022/CLOUD_APP_WEB_IOT_KeepYourEndeavor_Moment/blob/main/APP(BE)/images/logo.png'/>
</a>
</p>
<h1  align="center">KY2 API SERVER</h1>
<h4  align="center">모든 서버들의 허브 터미널</h4>
<br/>

본 서버는 **Keep Your Endeavor (블록체인 기반 공정한 병기본 솔루션)** 서비스와 관련된 **`모든 DB들의 유기적 CRUD`** 를 목표로 설계됐습니다. <br>
DB의 CRUD를 위해 서버 관리자가 직접 에디터를 열어야 하는 경우는 firestore의 collection 삭제하는 경우를 제외하고는 없습니다. <br>
DB 접근에 권한을 나누어 관리하기 위해 각 user들에게 authority를 부여하는 token 인증 방식을 택했습니다.

### 서버의 종류
**`Redis`** | **`MySQL`** | **`Firebase`**
#### Redis
token 정보를 저장합니다. Cloud Redis를 채택해 개발 단계의 부담을 줄였습니다.
#### MySQL
유저의 신상정보, 공지정보, 이슈정보 등 기록에 관련한 정보를 제외한 대다수의 정보가 이 곳에 저장됩니다.
#### Firebase
등급을 매기는 기준표를 저장하는 저장소입니다. Cloud service이기 때문에 개발 단계에서의 부담을 줄였습니다.


## 설치 및 실행 방법 - npm
### 환경 설정
|service|version|
|--|--|
|**NodeJS**|v16|
|**MySQL**|5.7.x|
|**EXPRESS**|v4.x|

### 설치
```ssh
git pull https://github.com/osamhack2022/CLOUD_APP_WEB_IOT_KeepYourEndeavor_Moment
```
```ssh
cd APP\(BE\)
```
### 시작
```ssh
npm start
```

## 서버 관계도
<p align = 'center'><img src='https://github.com/osamhack2022/CLOUD_APP_WEB_IOT_KeepYourEndeavor_Moment/blob/main/APP(BE)/images/structure.jpg'/></p>


### APP(FE)
- 사용자 front end server
- 일반 사용자들의 Read 목적
### WEB(FE)
- 관리자용 front end server
- API SERVER의 DB CRUD API 접근 가능
- 권한 있는 아이디로만 사용 가능
### KY2 SERVER
- 유저당 peer 생성 (도메인 생성)
- peer에 따른 원장 관리
- 원장 일치 알고리즘 적용
- 사용자들의 실제 기록 아카이브
### KY2 SERVER SUBPARTY
- Dashboard : 해당 peer에 저장된 데이터를 GUI로 보여준다
- DB : peer 별로 생성되며 해당 peer의 block들을 보관한다

## MySQL DB 구조도
<img src='https://github.com/osamhack2022/CLOUD_APP_WEB_IOT_KeepYourEndeavor_Moment/blob/main/APP(BE)/images/KYE.png'/>

## API 문서

<br>

`api-document` : [문서 바로가기](https://github.com/osamhack2022/CLOUD_APP_WEB_IOT_KeepYourEndeavor_Moment/tree/main/APP(BE)/api-document)
