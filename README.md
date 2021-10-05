<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">OO 배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# 인치의 deploy book

## 1. 나의 배포 경험

- **netlify**
  : 우아한테크코스에서 간단하게 결과물을 배포하기 위한 배포 툴
  : 빠르게 배포 가능한 정적 컨텐츠 호스팅 서비스
  : 간단한 특수 기능 제공 (PR 빌드 유효성 확인, 도메인등록, HTTPS, CDN, DNS등)
  : 서버의 고급 설정 (엘라스틱, 트래픽 관리 등) 기능 미제공
- **Firebase Hosting**
  : netlify 와 유사.
  : 실제 프로덕 정적 컨텐츠 제공에 용이
  : NoSQL 기반 Firbase DB와 연동에 용이
  : SSR등을 설정하기 위한 express, 미들웨어 설정등 입문장벽 존재.
- **github pages**
  : 앞서 두개의 배포 툴과 유사.
  : github.io로 무료 도메인을 1개까지 사용할 수 있다.
  : github에서 특정 레포를 설정에서 해당 도메인으로 배포할 수 있다.
  : 대신 처음부터 블로그를 만들거나 하는 목적으로 사용하기 위해서 Jekyll 등 입문장벽이 존재한다. (R은 쉽지만 CUD 와 같은 유사 서버 작업 필요한 경우)
- **AWS EC2**
  : 배포 세부 설정에 용이 (VPC, 보안그룹)
  : AWS 다른 기능들과의 연동성
  : 서버의 트랙픽 관리에 용이하고, 서버의 용량을 변동적으로 사용할 수 있다.
  : 입문장벽 존재.
- **AWS S3, CloudFront**
  : 성능 미션을 통해 처음으로 시도
  : 저장 storage에 파일을 올리고, 해당 파일을 CDN에 등록하는 방법
  : 생각보다 간단, 이후 다른 AWS와 연동에 용이할듯
  (EC2에서 S3를 DB로 사용하고, 해당 DB 데이터를 CDN으로 배포등)

## 2. AWS에서 SSR, CSR에 따른 배포 전략

- CSR이 CDN배포가 권장되는 이유
  ```
  CSR은 웹페이지를 구성하는 파일들 css ,js, assets를 로드해와서 사용자의 컴퓨터에서 동적으로 로딩한다.
  결국 파일들은 정적인 상태로 유지되는 형태로 작동하기에 SSR과 같이 서버의 작업을 필요로 하지 않아,
  사용자가 보다 빠르게 컨텐츠에 접근, 트래픽 부하 감소를 제공하는 CDN 을 사용하는게 권장된다.
  ```
- EC2 배포가 가지는 특징
  ```
  장점이자 단점이 사용자가 모든것을 설정해야한다는 것이다.
  서버를 배포하고, 트래픽을 관리하는 등 세부적인 관리를 할 수 있지만,
  그 과정이 복잡하기에 단순하게 배포 결과를 확인하는등과 같은 간단한 작업을 테스트하기에 비효율적일 수도 있다.
  ```

## 3. 마크업한 결과물을 배포하고 그 과정 기록하기

- [애플웹사이트 S3+Cloudfront로 배포하기](https://www.chayan.io/a3d3b841-f2f5-48ed-ae1e-b7a7d290dabd)
- [nextjs로 항공사 웹사이트 컴포넌트가 있는 유닛 페이지 3개를 만든 후 EC2로 배포하기](https://www.chayan.io/7b7587b7-2f19-43a6-8921-4202f77c30ca)
