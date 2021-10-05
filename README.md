<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">디토 배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# 디토의 deploy book

## 1. 나의 배포 경험

- heroku: json-server
- netlify: 우테코 미션 배포
- s3, cloudfront: 보고 또 보고의 이미지 배포, 우테코 미션 배포
- ec2: nginx + express로 동적 html 및 정적 파일 배포

## 2. AWS에서 SSR, CSR에 따른 배포 전략

- CSR이 CDN배포가 권장되는 이유: CDN을 통해 클라이언트와 서버 간의 물리적인 거리를 줄여 빠르게 네트워크 요청과 응답을 할 수 있다. CSR의 경우 정적 파일로 구성되어 있기 때문에 모든 사용자가 동일한 html, css, js 파일을 받게 된다. 모든 사용자가 같은 파일을 응답받기 때문에 CDN에 미리 배포할 수 있고, CDN의 장점을 모두 누릴 수 있다.
- EC2 배포가 가지는 특징: EC2로 배포를 할 경우 정적 파일은 물론 동적 파일도 배포를 할 수 있게 된다. ec2에 express와 같은 서버를 두고, 사용자에 따라 다른 html을 구성해서 보내줄 수 있기 때문이다. 또한 nginx를 활용해 리버스 프록시, 로드 밸런서로 활용할 수도 있고, jenkins를 통해 CI/CD를 할 수도 있다.

## 3. 마크업한 결과물을 배포하고 그 과정 기록하기

- [애플웹사이트 S3+Cloudfront로 배포하기 및 nextjs EC2 배포하기](https://www.notion.so/27cc00c4212446738d3b503084c13cc3)

- 결과물
  - [애플웹사이트](https://d302ft43atdq2n.cloudfront.net/)
  - [접근성 미션 EC2](http://ditto-a11y.kro.kr/)
