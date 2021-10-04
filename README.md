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

- Github pages - 미션
- Heroku + Kaffeine - json server
- Netlify - 미션
- S3 + CloudFront + CI/CD - 팀 프로젝트, 개인 프로젝트
- EC2 - 미션

## 2. AWS에서 SSR, CSR에 따른 배포 전략

- CSR이 CDN배포가 권장되는 이유
  - CSR은 브라우저에서 정적 파일(html, css, js 등)들을 로드하여 렌더하는 방식을 취한다. 따라서 페이지에서 보여줄 때 필요한 리소스를 서버로부터 받아오게 되는데, CDN 배포를 이용하면 이러한 리소스들을 가까운 곳에 캐싱할 수 있다. 즉, 서버로의 요청을 가까운 CDN에 보내게 되어 더 빠르게 리소스들을 가져올 수 있다.
- EC2 배포가 가지는 특징
  - 가상 컴퓨팅 환경을 제공한다. (세부적인 컴퓨팅 환경 설정 가능)
  - 클라이언트에 따라 자원을 다르게 제공할 수 있다.

## 3. 마크업한 결과물을 배포하고 그 과정 기록하기

- [배포 과정 기록](https://keen-dichondra-fc6.notion.site/489bf0f5800d4f39af68c3af55eef359)
- [애플 웹 사이트(S3 + CloudFront)](https://d3ijy3pz46cem3.cloudfront.net)
- [nextjs + 항공사 웹 사이트(EC2)](http://ec2-52-78-11-161.ap-northeast-2.compute.amazonaws.com/)
