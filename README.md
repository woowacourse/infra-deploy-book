<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">엘라 배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# 엘라의 deploy book

## 1. 나의 배포 경험

- github-pages: 레벨1, 2의 간단한 미션 배포
- Firebase : 레벨2 페이먼츠, 장바구니 미션 배포
- AWS S3 + CloudFront: 팀 프로젝트, 레벨4 애플 마크업 미션
- AWS EC2: 레벨4 항공사 웹접근성 미션 배포

## 2. AWS에서 SSR, CSR에 따른 배포 전략

- CSR이 CDN배포가 권장되는 이유
  - 대부분 index.html 및 정적 파일들이기 때문에 동일한 파일을 요청할 확률이 높으므로 캐싱을 통해서 빠르게 리소스를 가져올 수 있다.
  - CSR은 번들된 Js파일이 무거울 수 있고 초기 로등 속도가 느리다. 하지만 CDN 배포를 통해 캐싱을 활용한다면 리소스를 빨리가져오므로 단점들을 보완할 수 있다.
- EC2 배포가 가지는 특징
  - 가상의 컴퓨터 한 대를 빌려쓴다고 생각하면 된다.
  - 직접 서버 컴퓨터 환경에 대한 설정을 할 수 있다.
  - 요구 사항이나 갑작스러운 인기 증대 등 변동 사항에 따라 신속하게 규모를 확장하거나 축소할 수 있어 서버 트래픽 예측 필요성이 줄어든다.

## 3. 마크업한 결과물을 배포하고 그 과정 기록하기

- 애플웹사이트 S3+Cloudfront로 배포하기 (https://dafgbwj283s1s.cloudfront.net)

  - [React 앱을 S3+CloudFront로 배포하기(1) - S3 Bucket 생성](https://hjuu.tistory.com/25)
  - [React 앱을 S3+CloudFront로 배포하기(2) - CloudFront 설정](https://hjuu.tistory.com/26)
  - [React 앱을 S3+CloudFront로 배포하기(3) - 도메인 연결](https://hjuu.tistory.com/37)

- nextjs로 항공사 웹사이트 컴포넌트가 있는 유닛 페이지 3개를 만든 후 EC2로 배포하기 (http://ec2-3-35-233-69.ap-northeast-2.compute.amazonaws.com:8080/)
  - [Next.js + React를 AWS EC2로 배포하기(1) - EC2 인스턴스 생성](https://hjuu.tistory.com/43)
  - [Next.js + React를 AWS EC2로 배포하기(2) - 어플리케이션 무중단 배포](https://hjuu.tistory.com/44)
- 같이 읽으면 좋은 글
  - [웹에서 렌더링은 어떻게 발전하고 있을까?](https://hjuu.tistory.com/41)
