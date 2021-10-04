<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">OO 배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# 지그의 deploy book

## 1. 나의 배포 경험
- netlify, github pages를 이용한 정적 웹 사이트 배포
- 성능 미션을 S3 + Cloudfront로 배포
- EC2 배포는 이번이 처음!

## 2. AWS에서 SSR, CSR에 따른 배포 전략

**🌱 CSR이 CDN배포가 권장되는 이유**

✔️ CSR은 HTML, CSS, JavaScript 등의 코드나 이미지 등의 에셋들을 포함하고 있는 정적 파일로 구성된다. 정적 파일은 변경이 자주 발생하지 않기 때문에, CDN의 캐싱 전략을 사용해서 가져오는 것이 유리하다.

✔️ 리소스를 요청할 때마다 매번 오리진 서버에 접속하는 것보다 CDN에 캐싱되어 있는 리소스를 가져오는 것이 더 빠르다.

✔️ CSR에서는 브라우저 렌더링 및 모든 인터랙션을 클라이언트 즉 사용자의 브라우저가 처리한다. 따라서 필요한 리소스를 빠르게 가져올 수 있는 CDN을 이용한다.

✔️ CDN을 이용하면 오리진 서버의 부하를 줄여줄 수 있다.

✔️ CSR의 큰 번들 파일을 CDN을 이용하여 압축해줄 수 있다.

[관련 링크 - CDN](https://web.dev/content-delivery-networks/)

**🌱 EC2 배포가 가지는 특징**

✔️ 가상 컴퓨팅 환경을 제공한다. 

✔️ 원하는 만큼 가상 서버를 구축하고, 보안 및 네트워크 구성과 스토리지 관리가 가능하다.

✔️ DB 접근과 서버에서 필요한 복잡한 연산이 가능하다.

✔️ nginx등의 웹서버를 이용해서 라우팅을 제공한다.

✔️ 강력한 안전성과 보안을 제공한다. 

## 3. 마크업한 결과물을 배포하고 그 과정 기록하기
**🍎 애플웹사이트 S3+Cloudfront로 배포하기**
- [블로그에서 읽기](https://zigsong.github.io/2021/08/28/fe-s3-cloudfront/)
- [배포 페이지](https://d3j6lremm8px4r.cloudfront.net/)

**✈️ nextjs로 항공사 웹사이트 컴포넌트가 있는 유닛 페이지 3개를 만든 후 EC2로 배포하기**
- [블로그에서 읽기](https://zigsong.github.io/2021/10/02/fe-aws-ec2-next/)
- [배포 페이지](http://13.125.205.164/)
