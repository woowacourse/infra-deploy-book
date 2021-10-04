<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">그루밍의 배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# 그루밍의 deploy book

## 1. 나의 배포 경험

- Github-pages: [Javascript Lotto](https://ddongule.github.io/javascript-lotto/), [Javascript Racing Car](https://ddongule.github.io/javascript-racingcar/), [Javascript Calculator](https://ddongule.github.io/javascript-calculator/) 등
- Heroku: [React Payments](https://ddongule-payments.herokuapp.com/) 등
- Pythonanywhere: [React Shopping Carts Test API](http://mk27.pythonanywhere.com/baskets/?format=api)
- Netlify: [React Shopping Cart](https://www.react-shopping-cart.ddongule.com/) 등
- AWS S3 + Cloudfront: [Babble Front 배포](https://www.babble.gg), [Apple Clone](https://d1mebyiq9on4aw.cloudfront.net)
- AWS EC2: [A11y-Airline](http://ec2-3-36-103-153.ap-northeast-2.compute.amazonaws.com/)

## 2. AWS에서 SSR, CSR에 따른 배포 전략

- CSR이 CDN배포가 권장되는 이유
  CDN(Content Delivery Network)으로 배포한다면 클라이언트와 서버 간의 물리적인 거리를 줄여 빠른 요청/응답이 가능하다. CSR의 경우에는 정적인 파일이기 때문에 이런 장점과 더불어 캐싱이 가능하고, 이러한 캐싱은 요청/응답을 더욱 빠르게 한다.

- EC2 배포가 가지는 특징
  EC2에 배포하는 건 어떤 서버의 컴퓨터 한 대를 아예 빌린다고 생각하면 된다. 그렇기 때문에 사용자가 필요한 시스템의 요구사항에 따라 각자 컴퓨팅 파워의 조정이 가능하다.

## 3. 마크업한 결과물을 배포하고 그 과정 기록하기

#### 애플 웹 사이트

- [S3 + Cloudfront로 배포한 내용 기록하기](https://mingule.tistory.com/70)
- [배포된 사이트](https://d1mebyiq9on4aw.cloudfront.net)

#### 항공사 웹사이트

- Next.js로 항공사 웹사이트 컴포넌트가 있는 유닛 페이지 3개를 만든 후 EC2로 배포한 내용 기록하기 (아직 작성중입니다.. ㅜㅜ)
- [배포된 사이트](http://ec2-3-36-103-153.ap-northeast-2.compute.amazonaws.com/)
