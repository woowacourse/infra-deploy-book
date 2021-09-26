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

## 2. AWS에서 SSR, CSR에 따른 배포 전략

- CSR이 CDN배포가 권장되는 이유
- EC2 배포가 가지는 특징

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

- nextjs로 항공사 웹사이트 컴포넌트가 있는 유닛 페이지 3개를 만든 후 EC2로 배포하기
