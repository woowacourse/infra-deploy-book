<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">썬의 배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# 썬의 deploy book

## 1. 나의 배포 경험

### GitHub Pages

Webpack 설정이 없는 경우 root에 index.html이 존재하면 매우 간단하게 배포를 진행할 수 있다. 바닐라 JS로 미션을 진행한 Level1 기간에 많이 사용했다.
리액트 프로젝트의 경우 `gh-pages` 라이브러리를 통해 배포를 진행했는데, 스크립트 실행 시 자동으로 GitHub 저장소에 배포를 위한 브랜치를 만들어 빌드 파일을 업로드해준다.
사용법이 간단하고, 코드 관리와 배포 관리를 한 곳에서 할 수 있다는 점에서 매우 편리하다.

### Netlify

GitHub 저장소와 연결시켜두면 저장소에 새로운 변경 발생 시 자동으로 재배포된다. 빌드 스크립트를 설정해두면 자동으로 빌드 후 배포해주어 React 프로젝트를 배포할 때 편리하게 이용했다.
API 키를 가리기 위한 프록시 서버 용도로도 사용한 경험이 있다. 미션을 위한 배포 정도는 무료플랜으로 충분하여 편리하게 사용했다. 추후 블로그를 만든다면 Netlify를 통해 배포하고자 하는 생각이 있다.
환경변수나 커스텀 도메인 설정 정도의 기능만 인지하고 있지만, 그 외 많은 기능이 있는 것으로 알고 있다.
프로젝트 추가 시 자동으로 설정되는 프로젝트명을 원하는대로 변경할 수 있고, 변경된 프로젝트명이 배포 주소에 사용된다.

### AWS S3 + CloudFront

[찜꽁](https://github.com/woowacourse-teams/2021-zzimkkong) 프로젝트의 프론트엔드 배포 시 사용했다. 제공하는 기능이 많은 만큼 사용이 복잡하다.
재배포 시 하루정도 캐싱이 적용되어 바로 업데이트 내용을 확인하기 위해서는 수동으로 무효화를 해줘야했던 기억이 있다.
재대로 사용하기 위해서는 학습이 필요해보인다.
번외로 위의 두 서비스에 비해 UI가 투박하다.

## 2. AWS에서 SSR, CSR에 따른 배포 전략

### CSR이 CDN배포가 권장되는 이유

- CSR은 HTML, CSS, JS 등의 정적 파일로 구성된다.
- 정적 파일들은 자주 변경되지 않는다. 따라서, 매번 서버에 접속하여 자원을 가져오기보다 CDN에 캐싱되어있는 자원을 가져오는 것이 더 빠르다.
- CDN을 이용하여 용량이 큰 자원을 압축할 수 있다.

### EC2 배포가 가지는 특징

- 원하는 가상 컴퓨팅 환경을 구축아혀 사용할 수 있다.

## 3. 마크업한 결과물을 배포하고 그 과정 기록하기

### 애플웹사이트 S3+Cloudfront로 배포하기

- [배포가이드](./s3_cloudfront/README.md)
- [배포사이트](https://d3ursj8gk94e93.cloudfront.net/)

### nextjs로 항공사 웹사이트 컴포넌트가 있는 유닛 페이지 3개를 만든 후 EC2로 배포하기

- [배포가이드](./nextjs_ec2/README.md)
- [배포사이트](http://ec2-3-34-5-224.ap-northeast-2.compute.amazonaws.com/)
