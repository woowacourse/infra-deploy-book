<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

## 1. 나의 배포 경험

- Github pages
- Netlify
- Cloudfront + S3
- EC2

## 2. AWS에서 SSR, CSR에 따른 배포 전략

- CSR이 CDN배포가 권장되는 이유
  - CSR 뿐만 아니라 정적 파일이라면 CDN을 사용하는 것이 유리 (SSG도 고려 가능)
  - CSR 같은 경우, 불러온 스크립트 파일을 통해 클라이언트 단에서 렌더링을 하기 때문에 서버에서 동적으로 다루어줄 일이 상대적으로 적음
  - 따라서 서버로부터 매번 같은 자원을 가져와야 한다면, 캐싱을 통해 요청 대역폭을 줄이고 페이지 로드 속도를 높이는 게 좋음
- EC2 배포가 가지는 특징 (S3와 비교)
  - 배포 관련 설정을 폭넓게 다루어줄 수 있음 (프록시, 응답 서버)
  - 동적 페이지 응답 가능

## 3. 마크업한 결과물을 배포하고 그 과정 기록하기

- [과정 정리](https://subdued-credit-f97.notion.site/Deploy-065a4d084e6648cc948135e3efc42a94)
- [애플 스토어 (CloudFront + S3)](https://d2r677oxbgul1b.cloudfront.net/)
- [항공사 웹사이트 (Next.js + EC2)](http://ec2-13-209-4-51.ap-northeast-2.compute.amazonaws.com/)
