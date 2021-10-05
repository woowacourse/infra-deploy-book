<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">유조의 배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# 유조의 deploy book

## 1. 나의 배포 경험

- Github Pages
  - github blog, 레벨 1, 2 미션들
- Netlify
  - 레벨 1, 2 미션들
- heroku
  - proxy server
  - mock server
- Vercel
  - Next.js App
- AWS S3 + Cloudfront
  - 찜꽁 프로젝트
  - 애플 웹 사이트
- AWS EC2
  - 항공사 웹 사이트

## 2. AWS에서 SSR, CSR에 따른 배포 전략

### 2-1. CSR이 CDN배포가 권장되는 이유

- CDN을 사용하면 사용자와 가까운 위치에 캐싱된 정적 자원을 가져올 수 있다.
- CSR의 경우 정적 파일을 전송하면 사용자의 브라우저에서 해당 정적 파일(HTML, CSS, JS)를 실행하는 역할을 맡게 된다.
- 따라서 정적 파일만 제공해도 되는 CSR의 경우 CDN에 배포를 함으로써 사용자에게 더욱 빠르게 정적 파일들을 제공할 수 있기 때문에 CDN 배포가 권장된다.

### 2-2. EC2 배포가 가지는 특징

- 정적 파일 호스팅을 지원하는 S3 버킷과는 다르게 EC2는 하나의 서버를 운영할 수 있다.
- 웹 서버를 AWS 상의 가상 서버로 구축하여 서버를 배포할 수 있다.
- 과거 온프레미스로 서버를 운영하는 경우 사용자의 서버 컴퓨터가 항상 돌아가야 했지만 이제는 그 역할을 클라우드 컴퓨팅 서비스 제공업체가 대신 해주고 있다.
- EC2 인스턴스 자체가 하나의 컴퓨터이기 때문에 console에서 nginx, pm2, docker 등 서버에 필요한 다양한 툴들을 추가로 설치해 사용할 수 있다.

## 3. 마크업한 결과물을 배포하고 그 과정 기록하기

### 3-1. CSR(애플웹사이트) S3+Cloudfront로 배포하기

1. S3 버킷 생성
2. 정적 파일 S3 버킷에 업로드
3. S3 버킷과 연동된 CloudFront 생성
4. 403 리다이렉션, 캐시 컨트롤 등 설정

- 배포 사이트
  - https://d29g00nuocsm6y.cloudfront.net

### 3-2. SSR(항공사 웹사이트) EC2로 배포하기

1. EC2 인스턴스 생성
2. EC2 연결(ssh, aws console 등)
3. EC2에 배포할 프로젝트 클론 및 설정(npm install 등등)
4. (ssh 기준) ssh가 종료되어도 서버가 유지되도록 설정(아래 중 하나)
   - pm2
   - Linux nohup
   - docker

- 배포 사이트
  - http://ec2-3-36-113-182.ap-northeast-2.compute.amazonaws.com/
