<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">OO 배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# 미키의 deploy book

## 1. 나의 배포 경험

- S3 + CDN 환경으로 정적 페이지 배포, EC2에 젠킨스를 올려 CI/CD
- EC2를 프론트 서버로 사용하여 동적 페이지 배포(SSR)

## 2. AWS에서 SSR, CSR에 따른 배포 전략

- CSR이 CDN배포가 권장되는 이유
  SSR과는 달리 새로 배포되지 않으면 항상 같은 자원(파일)을 가져오기 때문.
  같은 자원이기 때문에 CDN에 캐시 해두면 훨씬 빠른 응답으로 파일을 가져올 수 있다.
- EC2 배포가 가지는 특징
  - 같은 요청을 보내더라도 사용자에 따라 다른 자원을 내려주기 때문에 CDN을 이용하기 어렵다.
  - 각 end point에 대해 어떤 자원을 내려줄지 직접 서버 코드를 작성한다.
  - 직접 서버 컴퓨터 환경에 대한 설정을 할 수 있음

## 3. 마크업한 결과물을 배포하고 그 과정 기록하기

- 애플웹사이트 S3+Cloudfront로 배포하기
  - [S3+Cloudfront 가이드북](https://empty-pufferfish-2ac.notion.site/990b7c95256347619ce80c5fcb516ff7)
  - [애플 웹사이트 데모](https://d14vkr4j9ey00k.cloudfront.net/)
- nextjs로 항공사 웹사이트 컴포넌트가 있는 유닛 페이지 3개를 만든 후 EC2로 배포하기
  - [nextjs+EC2 가이드북](https://empty-pufferfish-2ac.notion.site/SSR-By-1f9b7dfa2c914ba099963383f2f9c49a)
  - [항공사 웹페이지 데모](http://ec2-54-180-102-170.ap-northeast-2.compute.amazonaws.com/)
