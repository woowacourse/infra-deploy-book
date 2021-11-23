<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">OO 배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# OO의 deploy book

## 1. 나의 배포 경험

### Github Pages
- 정적 페이지를 가장 간단히 배포할 수 있는 방법 중 하나이다.
- 깃헙에서 각 레포, 브랜치 단위로 배포할 수 있다.

<br>

### Netlify
- 정적리소스 배포를 제공
- 깃헙 등과 연동하여 특정 브랜치에 대한 push를 기준으로 CI/CD 수행
  - 빌드 커맨드를 지정할 수 있어 번들링, 트랜스파일링 등을 동적으로 수행할 수 있음
- Serverless Function을 통해 다양한 기능을 구현할 수 있음
  - 예를들어 Proxy 서버 구현

<br>

### Heroku
- 여러 언어를 지원하는 Paas
- addon으로 많은 기능을 지원
  - 예를들어 SQL 서버
- cli 제공, 깃헙 등과 연동해 CI/CD 지원

<br>

## 2. AWS에서 SSR, CSR에 따른 배포 전략

### CSR이 CDN배포가 권장되는 이유
- CSR은 서버로부터 리소스를 가져와 직접 화면을 구성하는 렌더링 방식이다.
- CSR 앱에서 서버가 해야할 역할은 단지 리소스를 빠르게 클라이언트에게 전달하는 것뿐이다.
- CDN은 Origin과 별개로 각 지역마다 엔드포인트를 두어 정적리소스를 캐싱 및 제공하도록한다.
- CSR 앱이 빠르게 컨텐츠를 보여주기 위해서 CDN 배포가 권장된다.

<br>

### EC2 배포가 가지는 특징
- 정적리소스 뿐만아니라 동적으로 가공한 리소스를 제공할 수 있다.
- 따라서 SSR 방식도 지원할 수 있따.

## 3. 마크업한 결과물을 배포하고 그 과정 기록하기

### 3.1 애플웹사이트 S3+Cloudfront로 배포하기

#### 기본 플로우
- S3는 Simple Storage Service를 의미하며 AWS의 스토리지 서비스이다. 이 스토리지 '버킷'에 정적 리소스(html, css, js 이미지 등)를 올려 호스팅한다.
- 다만 사용자가 직접 S3 ip 주소에 접근하지는 않도록한다.
- CloudFront라는 CDN 서비스를 이용해 각 사용자에게 리소스를 제공한다. 즉, S3에는 각 CDN 서버만 접근한다.

<br>

#### 배포과정
1. S3 버킷 생성
  - 버킷 이름 및 지역 설정
  ![스크린샷 2021-11-23 오후 12 46 39](https://user-images.githubusercontent.com/57767891/142968585-7c72bf88-3c40-47eb-b5c0-b1b2e58188bd.png)
  - 퍼블릭 액세스 차단.
  - 이 버킷에는 CloudFront를 통해서만 접근할 예정이기 때문에 다른 모든 접근을 제한한다.
  ![스크린샷 2021-11-23 오후 12 46 50](https://user-images.githubusercontent.com/57767891/142968599-e3e7957a-bc47-4b00-bd99-16b1daf3c238.png)
  - 버킷 생성 및 확인
      <img width="1082" alt="스크린샷 2021-11-23 오후 12 56 52" src="https://user-images.githubusercontent.com/57767891/142969310-4785e824-39ec-4d6f-a4ba-af9fac5294f3.png">

<br>

2. S3에 정적리소스 추가
  - 생성된 S3버킷에 호스팅할 리소스들을 추가한다.
  ![스크린샷 2021-11-23 오후 1 13 26](https://user-images.githubusercontent.com/57767891/142970320-c9cf3a59-5cd8-4879-bc82-bea4c1dd7b45.png)
  ![스크린샷 2021-11-23 오후 1 15 41](https://user-images.githubusercontent.com/57767891/142970460-790d36ce-c836-48bf-a8c3-1025a118cd3e.png)


<br>

3. CloudFront 배포 생성
  - 원본 도메인 설정
  - 돋보기 버튼을 눌러 조금 전 생성한 S3 버킷의 도메인을 찾는다.
    <img width="790" alt="스크린샷 2021-11-23 오후 12 59 28" src="https://user-images.githubusercontent.com/57767891/142969485-fda2167a-7645-42eb-8b5d-5b4048bb46e5.png">
  - 우리는 조금 전 S3 버킷에 대한 퍼블릭 액세스를 제한했다. 이는 CloudFront를 통해서만 접근하도록 하기 위함인데, 이를 가능하게 하는 것이 바로 OAI(Origin Access Identity)이다. 즉, 가상의 사용자를 만들고 id를 부여해 이 id를 가지고 있는 사람만 접근하게 하는 방법이다. 이를 위해 기존에 생성된 OAI를 사용하거나 새로 생성한다.
    <img width="790" src="https://user-images.githubusercontent.com/57767891/142969773-1b144cdb-58e6-40a0-9903-bcdd0809fa28.png">
    <br>
    <img width="790" src="https://user-images.githubusercontent.com/57767891/142969832-c8206b28-2177-4b74-b621-85088b59aa7f.png">
  - 필요에 따라 CloudFront가 원본 도메인으로 보내는 요청에 추가할 헤더를 설정할 수도 있다.
    <img width="790" src="https://user-images.githubusercontent.com/57767891/142969901-0c1be5be-a831-48b8-a6f0-760282f96e37.png">
  - Origin Shield라는 기능도 제공한다. 말 그대로 Origin의 부하를 줄이기 위한 추가 캐싱 계층이다.
    <img width="790" src="https://user-images.githubusercontent.com/57767891/142969962-415b2c5f-6387-4ead-8a35-9e2a9ac5ddda.png">
  - 추가로 캐싱 등 다른 설정들이 있지만 이번 배포 과정에서는 다루지 않도록 한다.


<br>
<br>

4. 배포성공? 예외처리!
  - 성공적으로 배포했으니 CloudFront가 제공하는 도메인으로 접속해보자
  - 그러나 마주하게 되는 건 에러메시지
    <img width="790" alt="스크린샷 2021-11-23 오후 12 59 28" src="https://user-images.githubusercontent.com/57767891/142970638-609f8a66-032e-4955-81ac-3d7f41a88107.png">
  - S3는 정적리소스만을 호스팅하고 있기 때문에 정확하게 index.html을 요청하지 않으면 페이지를 받아 볼 수 없다.
  - 즉, 지금의 S3는 불친절한 음식점과 같다. 단순히 들어가 앉기만 해서는 기본 반찬은 커녕 메뉴판이나 물 한잔도 제공하지 않는다.
  - 우리는 해당 음식점에 들어가자 마자 뭐라도 나오길 바란다. 해당 도메인으로 접속했을 때 굳이 말하지 않아도 index.html이 보여지길 바란다. CloudFront설정을 통해 이를 해결할 수 있다.
  - 우선 CloudFront 배포 인스턴스 -> 일반에서 설정 '편집'을 클릭한다.<br>
    <img width="790" src="https://user-images.githubusercontent.com/57767891/142972194-264190b4-37f3-4147-93df-c10791328485.png">
  - 그리고 기본값 루트 객체를 지정해준다. 기본값 루트 객체는 루트 URL(/) 접속시 제공할 객체를 의미한다. 이를 index.html로 지정한다.
    <img width="790" src="https://user-images.githubusercontent.com/57767891/142972222-045287db-d4e8-4fd6-8d17-57280ddf12e1.png">
  - 설정 저장 후 다시 배포가 되고나면 url에 index.html을 명시하지 않아도 원하는 페이지가 보여지는 것을 확인할 수 있다.
    <img width="790" src="https://user-images.githubusercontent.com/57767891/142972285-40348441-da27-4629-b907-66c62a84e50a.png">

<br>

### 3.2 nextjs로 항공사 웹사이트 컴포넌트가 있는 유닛 페이지 3개를 만(든 후 EC2로 배포하기)들기.. ㅠ
#### Next JS 사용하기
- next js는 React앱을 위한 SSR 프레임 워크이다.
- next js앱의 pages 디렉터리에 있는 모듈들이 각각 SSR로 제공되는 페이지가 된다.
- next js는 pages의 index.js를 인덱스 리소스로 제공한다.
- _document.js 파일에서 meta데이터 등 실제 HTML문서에 포함될 내용을 지정할 수 있다.
- _app.js는 가장 먼저 실행되는 파일이며 이를 통해 기본 레이아웃을 정하는 등으로 활용할 수 있다.
