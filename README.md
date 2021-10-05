<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">파노 배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# 파노의 deploy book

## 1. 나의 배포 경험

- 레벨1-2 과제: Github Page, Netlify, Heroku
- 레벨3 프로젝트: AWS EC2 + Docker + Github Actions
- 레벨4 애플 클론코딩: AWS S3 + Cloudfront

## 2. AWS에서 SSR, CSR에 따른 배포 전략

- CSR이 CDN배포가 권장되는 이유'

  - CSR은 정적파일을 serve하는 것 외에 별다른 서버의 동작이 필요하지 않다. 이는 CDN으로도 충분한 일이다.

  - CDN은 일반적으로 세계각지에 데이터센터를 두어 자체적인 캐싱레이어를 갖고 있다. 사용자는 본인과 가까운 센터에 접근해, 보다 빠르게 캐싱된 컨텐츠에 접근할 수 있다.

  - CDN 프로바이더가 배포서버를 관리하는 셈으로, 개발자는 트래픽 부하 등의 서버 이슈에 대해서 자유롭다.

- EC2 배포가 가지는 특징

  - EC2는 IaaS로 클라우드 프로바이더가 미리 설정해둔 옵션이 제공되는 PaaS에 반해, 배포에 필요한 모든 설정을 개발자가 직접 해야 한다.

  - 정적파일을 배포하는 것에서 나아가 추가적인 배포 작업이 필요할 경우, EC2배포를 이용해야한다. (SSR 등)

  - CDN이 가지는 캐싱의 이점은 갖고있지 않다.

## 3. 마크업한 결과물을 배포하고 그 과정 기록하기

- 애플웹사이트 S3+Cloudfront로 배포하기

  1. 배포용 S3 버킷 생성

     - ![image](https://user-images.githubusercontent.com/44419181/134805716-80250ee4-edf8-44a8-8a3c-b8337faaaff5.png)

  2. 버킷에 배포할 프로젝트 파일 업로드

     - ![image](https://user-images.githubusercontent.com/44419181/134805820-49230189-3c49-48bd-9637-f28f4014c0e4.png)

  3. CloudFront 배포 생성

     - ![image](https://user-images.githubusercontent.com/44419181/134805905-d71b4aad-6ffe-45c1-b31d-ff95fe720208.png)

  4. S3 버킷을 원본 도메인으로 설정

     - ![image](https://user-images.githubusercontent.com/44419181/134805947-f9a6cc4c-2a52-42be-b0b0-6158a632f890.png)

  5. S3 버킷 액세스 'OAI 사용' 설정

     - With an OAI, CloudFront sends authenticated requests to your S3 bucket

     - ![image](https://user-images.githubusercontent.com/44419181/134805968-a6218543-6e1e-4d53-b0f2-a30fc2123026.png)

  6. Origin Shield 활성화

     - ![image](https://user-images.githubusercontent.com/44419181/134806025-7d1074c6-93c1-45a1-af66-a4530f978a6d.png)

  7. 기본값 루트 객체 index.html 설정 및 배포 생성

     - ![image](https://user-images.githubusercontent.com/44419181/134806090-ad8c8088-e4e6-4b0f-9438-03b89e23b076.png)

  - ci/cd pipeline 구축하기

    1. aws access key 발급 받기

       - ![image](https://user-images.githubusercontent.com/44419181/134807702-d779d327-fb05-49f2-ad82-99379916dc40.png)
       - ![image](https://user-images.githubusercontent.com/44419181/134807740-fd8243bb-8752-4d75-a9f1-d70b6de79495.png)

    2. github secrets에 access key, secret access key 저장

       - ![image](https://user-images.githubusercontent.com/44419181/134809761-5e5569f0-343e-4389-b963-ce95953fac62.png)

    3. github actions yaml 파일 설정

       - ![image](https://user-images.githubusercontent.com/44419181/134809874-bf8bfa91-6eb5-4e85-95a4-67f148f7b55a.png)

       - 4번째 인자가 source, 5번째 인자가 target으로 source 디렉토리의 파일들과 target 디렉토리를 동기화한다.

- nextjs로 항공사 웹사이트 컴포넌트가 있는 유닛 페이지 3개를 만든 후 EC2로 배포하기

  - 작성 중..
