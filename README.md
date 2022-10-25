
# Keep_Your_Endeavor ( 너의 노력을 지켜라 )

  

<p  align="center">

<img  width="700px"  height = "200px"  src='https://github.com/osamhack2022-v2/CLOUD_APP_IOT_KeepYourEndeavor_Moment/blob/main/images/banner.png'/>

</p>

  

**블록체인 기반 장병 자격 인증 시스템**

  

## 개요

군 장병은 진급하기 위해서는 자격 인증 평가를 통과해야 합니다.

장병 A는 이를 자신의 시간과 노력을 투자해 통과합니다.

장병 B는 이런 노력을 바보 같은 짓으로 치부하고 부정행위와 청탁을 통해 통과합니다.

  

**이 두 장병은 같은 날, 같은 곳에서 함께 진급합니다.**

  

저희 KeepYourEndeavor(이하 KY2)는 이러한 상황을 단순히 장병들을 교육해서 될 문제라고 보지 않고 **새로운 솔루션** 을 제시하고자 합니다.

  

KY2 서비스는 **측정, 기록, 열람까지의 과정을 통합** 하고 블록 체인과 연계하여 중간 과정에서 벌어질 수 있는 누락, 조작 사고를 예방합니다.

  

또한 자격인증 현황을 쉽게 조회할 수 있는 앱을 제공함으로써 장병들의 편의를 증진하고 담당 관리자의 업무 부담이 줄어듭니다.

  
  

## 프로젝트 소개

  

이에 저희 KY2팀은 결재자와 수집자들의 수정행위를 원천 차단하고, 자료제공자가 직접 자격인증평가내역을 블록체인에 온체인 시키며 평가 내역은 **블록체인을 통해 분산되어 관리** 되는 병 진급 시스템을 새로이 제시합니다.

  

- 관리자가 자격증에 대한 평가 일정을 공개해 사용자 앱에 알림이 뜨게합니다.

- 사용자는 앱을 통해서 열린 평가 일정에 대해 해당 평가에 응시하게 됩니다.

- 평가 당일 평가관은 장병들에 대해서 평가를 실시하고 평가내역을 IoT 기계로 측정한 후 API 서버를 거쳐 KY2 체인에 온체인 시킵니다.

- 평가 결과는 사용자가 원할 때 앱을 통해서 언제든지 열람할 수 있습니다

  

## KY2 체인의 장점

  

### KY2 체인의 확장성

저희가 직접 개발한 KY2 블록 체인은 단순히 장병 자격 인증 시스템에 머물지 않습니다.

[KY2 npm document](https://www.npmjs.com/package/ky2)

어느 프로젝트에서든 저희 블록체인에 요청을 날려 **신뢰성 있는 분산 데이터 저장 시스템** 을 이용할 수 있습니다.

  

이번 해커톤에서는 자격 인증 평가에 초점을 두었지만 이는 **KY2 체인의 여러 사용 케이스 중 하나일 뿐** 어디서든, 누구나 자신의 서비스에 활용 가능합니다.

  

### KY2 체인의 데이터 안전성

- 평가 데이터들은 노드를 통해 분산돼있기 때문에 하나의 노드에서 위변조가 발생하더라도 다른 노드가 검증을 통해 위변조된 데이터를 차단할 수 있습니다.

- 하나의 노드가 죽더라도 다른 노드를 통해 언제든지 평가 내역을 불러올 수 있습니다.

  
  

## 기능 설명

<p  align="center">
<img  width="700px"  height = "1000px"  src='https://github.com/osamhack2022/CLOUD_APP_IOT_KeepYourEndeavor_Moment/blob/main/images/service_flow.png'/>
</p>

  

### `CLOUD - BlockChain(BE)`

  

`KY2-Chain`은 **Keep Your Endeavor (블록체인 기반 장병 자격 인증 서비스)** 서비스의 데이터 무결성을 보증하기 위해 만들어진 허가형 블록체인 입니다.

  

`타입스크립트` 를 기반으로 개발되었으며 `Kafka`를 통해서 블록을 빠른 속도로 전파합니다.

  

모든 데이터는 암호화 되어 `Couchbase` 에 저장되며 네트워크가 허가된 사용자만이 자체적으로 제공하는 `Dashboard` 에서 블록데이터를 조회할 수 있습니다.

  

또한 `Channel Peer` 가 노드의 생성 / 삭제를 관리하며 해당 기능을 `API` 로 별도 제공합니다.

  

#### dashboard

  

`KY2-Chain-Explore` ( Block Chain dashboard ) 입니다.

KYE Client ( FE - APP/WEB ) 에서 가입한 아이디를 그대로 사용 가능합니다.

  

유저 한 명당 Block Chain Peer가 하나 생성되며 각자의 dashboard로 접근 가능합니다.

  
  

- Chain의 genesis 정보와 그에 링크되는 block data들 ( 저희 서비스에서 병 자격 인증 평가 점수 ) 을 확인 할 수 있습니다.

- 모든 peer의 데이터들을 같이 볼 수 있으며 이 데이터들은 원장일치알고리즘에 의해 동기화됩니다.

  

### `Server - APP(BE)`

`KY2-API Server` 는 **Keep Your Endeavor (블록체인 기반 장병 자격 인증 서비스)** 와 관련된 **`모든 DB들의 유기적 CRUD`** 를 목표로 설계됐습니다.

DB의 CRUD를 위해 서버 관리자가 직접 에디터를 열어야 하는 경우는 firestore의 collection 삭제하는 경우를 제외하고는 없습니다.

  

DB 접근에 권한을 나누어 관리하기 위해 각 user들에게 authority를 부여하는 token 인증 방식을 택했습니다.

  

### `APP(FE)`

`KY2-UserApp` 은 생체인증 기반 로그인을 지원하며 KY2 서비스 중 하나인 자격인증평가의 조회, 신청의 편의성을 목표로 설계됐습니다.

  

회원가입 시 블록체인 노드와 일대일대응되어 연결되며 블록체인에 저장된 본인의 자격을 쉽게 조회할 수 있습니다.

  

신청 시험 일정을 캘린더로 쉽게 조회 가능해 편리하게 시험에 신청할 수 있습니다.

  

또한 홈 화면에서 자신의 자격증들을 한눈에 확인할 수 있습니다.

  

### `CLOUD(FE)`

`KY2-Supervisor-Explore` 는 자격증을 OPEN 할 수 있고 열린 자격증에 대한 시험 실시 일정을 등록해 사용자들에 해당 공지에 신청을 할 수 있도록 관리할 수 있습니다.

  

공지에 들어가면 해당 공지에 신청한 인원들에 대해 점수를 기입할 수 있고, 한 번 기입한 인원은 데이터가 바로 온체인 되기 때문에 수정할 수 없습니다.

  

### `IOT(FE)`

`KY2-Machine` 은 병 자격 인증 평가에 한하여 설계된 체력 시험 측정 기기입니다.

  

아두이노 초음파 거리 측정 센서를 이용해 푸쉬업, 윗몸일으키기 등 횟수를 기록해야 하는 과목에 대해 공정한 평가를 목표로 설계됐습니다.

  

결과에 대해서 블루투스 모듈로 사용자의 APP을 Gateway로 사용해 바로 API-SERVER를 통해 결과가 BlockChain으로 온체인됩니다.

  
  

## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)

|device|low ability|
|--|--|
|**CPU**|Intel Core i5|
|**RAM ( 사용자 )**|8.00GB|
|**RAM ( 체인 서버 )**|32.00GB|

  

---

|browser|version|
|--|--|
|**Chrome**|106.0.5249.119(64bit)|
|**MS Edge**|106.0.1370.52(64bit)|

  
  

## 기술 스택 (Technique Used)

### `CLOUD - WEB(FE)`

|service|version|
|--|--|
|**React**|v18.x|
|**Semantic UI**|v2.x|

  

### `CLOUD - BlockChain(BE)`

|service|version|
|--|--|
|**NodeJS**|v14.x|
|**NGINX**|v1.23.x|
|**Docker Compose**|v20.x|
|**Kafka**|v3.2.x|
|**Couchbase**|v2.x|

  

### `Server - APP(BE)`

|service|version|
|--|--|
|**NodeJS**|v16.x|
|**EXPRESS**|v4.x|
|**REDIS**|v3.0.x|
|**Firebase**|cloud_service|
|**MySQL**|5.7.x|

  

### `FE - APP`

|service|version|
|--|--|
|**Flutter**|v3.x|
|**Figma**|web_service|

  

### `FE - WEB`

|service|version|
|--|--|
|**React**|v18.x|
|**Semantic UI**|v2.x|

  

### `FE - IOT`

|service|version|
|--|--|
|**Arduino IDE**|v2.x|

  
  

## 설치 안내 (Installation Process)

### `CLOUD - WEB(FE)`

```bash

$ npm install ky2

$ npm install

$ npm start

```

### `CLOUD - BlockChain(BE)`

AWS 상에서 실행되고 있기 때문에 Client로 접근만 하면 됩니다.

### `Server - APP(BE)`

AWS 상에서 실행되고 있기 때문에 Client로 접근만 하면 됩니다.

**demo url** : **`api.ky2chain.com`**

### `FE - APP`

```bash

git clone https://github.com/osamhack2022-v2/CLOUD_APP_IOT_KeepYourEndeavor_Moment.git

cd APP\(FE\)

flutter build apk

```

  

### `FE - WEB`

```bash

git clone https://github.com/osamhack2022-v2/CLOUD_APP_IOT_KeepYourEndeavor_Moment.git

cd CLOUDE\(FE\)

npm install

npm start

```

  

## 프로젝트 사용법 (Getting Started)

  

- APP (gif)

- WEB (gif)

- WEB -BC (gif)

- IOT - (gif)

## 팀 정보 (Team Information)

- 반영환 (lopahn2@gmail.com), Github Id: lopahn2 (Server, Database, IoT)

- 강은솔 (eunsol2953@gmail.com), Github Id: eunsolkang (Cloud, Web, App)

- 이원혁 (mosun2283@gmail.com), Github Id: Lee-Won-Hyeok (Web)

  

## 저작권 및 사용권 정보 (Copyleft / End User License)

* [MIT](https://github.com/osam2020-WEB/Sample-ProjectName-TeamName/blob/master/license.md)

* [GNU]()

  

This project is licensed under the terms of the MIT license.

This project is licensed under the terms of the GNU license.