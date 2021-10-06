<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">피터의 배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# OO의 deploy book

## 1. 나의 배포 경험

- Netlify

  - 우아한테크코스에서 미션 페이지를 배포하기 위한 용도로 자주 사용
  - 복잡한 세팅 없이 간단하게 정적 페이지를 배포할 수 있다는 장점
  - 깃헙과 연동하여 자동 배포 가능
  - 기본적으로 자체적인 CDN이 제공된다

- Github Pages

  - 마찬가지로 미션을 배포하거나, 블로그를 배포할 때도 사용했었음
  - Netlify를 접한 이후에는 거의 사용하지 않게 됨

- AWS S3 + Cloudfront

  - 우아한테크코스 프로젝트(Babble)를 배포하는 데에 사용
  - 마찬가지로 정적 페이지 배포에 사용
  - Netlify를 사용할 때보다 더 세부적으로 세팅 가능(캐시, CDN 설정 등)
  - 자주 사용하다보니, 생각보다 어렵지 않더라
  - AWS 자체로 웹 생태계를 구성할 수도 있겠다는 생각

- AWS EC2
  - 별도의 서버 로직을 수행할 수 있다
    - 단순히 저장소 역할만 하는 S3와는 다르게, EC2는 가상 컴퓨터이기 때문에 일반 컴퓨터에서 애플리케이션을 실행하는 것과 마찬가지로 사용자가 EC2 내부에서 서버 애플리케이션을 실행시킬 수 있다.
  - S3와 달리, EC2 인스턴스를 밑바닥부터 세부적으로 설정 가능하다
  - 우아한테크코스 SSR 배포 미션에 사용
  - 진입 장벽이 높다
  - 생각보다는 어렵지 않았지만, 아직 완전히 이해하진 못했다

## 2. AWS에서 SSR, CSR에 따른 배포 전략

- CSR이 CDN배포가 권장되는 이유
  - CSR은 SSR과 달리 별도의 서버 로직 없이 그저 정적 리소스들을 브라우저에 전송하는 식으로 로딩이 이루어지기 때문에, 사용자가 리소스를 빠르게 로딩할 수 있게 캐시를 활용하거나, 원본(S3 같은)에 가해지는 부하를 줄일 수 있게 CDN을 사용하는 것이 권장된다.
- EC2 배포가 가지는 특징
  - 서버 로직을 수행할 수 있다.
  - 처음부터 끝까지 전부 설정해줘야한다. (보안 설정이나 네트워크 설정 등등)
  - 하나하나 설정을 해줘야하기에 진입 장벽이 꽤나 높은 편이고, 숙련자에게도 귀찮음을 유발할 수 있다는 것이 단점.
  - CDN 캐싱의 이점도 가질 수 없다.

## 3. 마크업한 결과물을 배포하고 그 과정 기록하기

- 애플웹사이트 S3+Cloudfront로 배포하기
  - [애플 클론 코딩 사이트](https://d2y55jdkou1vjp.cloudfront.net/)
  - [S3 + Cloudfront로 배포하기](https://iborymagic.tistory.com/95)
- nextjs로 항공사 웹사이트 컴포넌트가 있는 유닛 페이지 3개를 만든 후 EC2로 배포하기
  - [항공사 웹사이트](http://ec2-3-34-137-30.ap-northeast-2.compute.amazonaws.com/)
  - [EC2로 Next.js 앱 배포하기](https://iborymagic.tistory.com/103)
