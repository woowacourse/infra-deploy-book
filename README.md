<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">신세한탄의 배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# 신세한탄의 deploy book

## 1. 나의 배포 경험

- github pages, netlify를 이용한 정적 웹 호스팅 경험
- aws S3 + Cloud front를 이용한 CSR application 배포 및 Jenkins를 통한 자동화 경험
- aws EC2를 이용한 SSR application 배포 경험

## 2. AWS에서 SSR, CSR에 따른 배포 전략

- CSR이 CDN배포가 권장되는 이유
  - CDN은 콘텐츠 전송 네트워크(CDN) 서비스로, 엣지 서버를 사용해 콘텐츠를 캐싱하고 서비스를 제공함.
  - CDN 배포 시 최종 사용자가 위치한 곳에 더욱 가깝게 콘텐츠를 전송할 수 있기 때문에 성능 향상 및 비용 절감 효과가 있음.
  - CSR은 빌드 시 html, js, css 파일 등이 정적으로 생성되기 때문에 파일들을 캐싱해둔 뒤 서비스하기에 적합함.
  - SSR은 빌드 시점에 정적 파일이 생성되는 것이 아니라, 요청 시마다 서버에서 html 파일을 생성해 응답하는 것이기 때문에 CDN에서의 컨텐츠 캐시가 어려움.
- EC2 배포가 가지는 특징
  - 프로젝트 별로 가장 적합한 가상 컴퓨팅 환경(운영체제, 메모리, 스토리지, GPU, 보안 등)을 설정하여 사용할 수 있음.

## 3. 마크업한 결과물을 배포하고 그 과정 기록하기

- 신세한탄의 deploy 기록

  - [EC2 + S3 + CloudFront + Jenkins 배포 자동화 실습](https://www.notion.so/EC2-S3-CloudFront-Jenkins-abf8b17a811541998e8939221ee35bd7)
  - [next.js 앱 EC2 배포하기](https://www.notion.so/next-js-EC2-9e611603a8d34994a710efa40654078d)

- 배포 미션 결과물
  - [신세한탄의 애플스토어 클론 사이트](http://d36r7q87wcnedl.cloudfront.net)
  - [신세한탄의 항공사 웹사이트](http://shinsehantan-a11y.p-e.kr/)
