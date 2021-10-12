<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">OO 배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# 심바의 deploy book

## 1. 나의 배포 경험

- GitHub Pages

  주로 레벨 1 미션에서 주로 사용하였다. repository - setting - pages 에서 배포하고싶은 소스(branch)를 골라서 선택해주면 자동으로 정적 페이지를 배포해준다. 과정이 쉽고 편리해서, HTML, CSS, JS 만으로 구성된 프로젝트라면 앞으로도 자주 사용할 것 같다.

- Netlify

  주로 레벨 2 미션에서 주로 사용하였다. GitHub Pages 는 Build 과정이 필요한 경우 조금 번거로웠는데, Netlify 는 배포 과정에서 Build Command 를 지정할 수 있어서, React 프로젝트를 배포할 때 사용했다. 또한 소스 파일이 변할 경우 자동으로 다시 Build 되어서 편리했다.

- S3 + Cloudfront

  레벨 4 미션에서 사용하였다. 배포 과정에서 Build 후 Bundle(소스 파일)을 수동으로 직접 S3에 업로드 하였다. 미션은 한번 배포하고 나면 소스 파일이 바뀔 일이 거의 없기 때문에 괜찮았지만, 프로젝트 였다면 GitHub Action 배포 자동화를 설정해주었어야 할 것 같다. AWS 의 정적 페이지 호스팅 서비스 이다보니 앞으로도 자주 접하게 되지 않을까 생각한다.

- EC2

  레벨 3 프로젝트의 웹서버를 배포할 때 사용하였다. 프론트엔드 소스가 모두 정적 소스였기때문에 Netlify 나 S3 + Cloudfront 를 사용할 수 있었지만, nginx를 사용해서 프록시 서버를 하기 위해서 EC2를 사용하였다. 그리고 이번에 nextjs 배포 미션을 하면서 SSR 배포를 위해서 다시 한 번 EC2 를 사용하였다.

## 2. AWS에서 SSR, CSR에 따른 배포 전략

- CSR이 CDN배포가 권장되는 이유

  CSR은 대부분 소스 파일이 정적 파일이다. 서비스가 배포된 후, 다음 버전의 서비스가 배포될 때까지는 소스 파일의 변화가 거의 없다. 그래서 CDN 배포를 통해 캐싱을 활용한다면 소스 파일을 더 빨리 가져올 수 있다.

- EC2 배포가 가지는 특징

  EC2는 가상 컴퓨팅 환경을 빌려서 사용하는 것이기 때문에 로컬 환경과 유사한 거의 모든 일을 할 수 있다. 사용자가 원하는 다양한 전략으로 배포하는 것이 가능하다. 하지만 사용자가 대부분 직접 설정해줘야하는 번거로움이 있다.

## 3. 마크업한 결과물을 배포하고 그 과정 기록하기

- 애플웹사이트 S3 + Cloudfront 로 배포하기

  [배포 사이트](https://d2qedurvu1f9vg.cloudfront.net/)

  [배포 과정](1.S3+Cloudfront.md)

- 항공사웹사이트 Next.js + EC2 로 배포하기

  [배포 사이트](https://simba-a11y.o-r.kr/)

  [배포 과정](2.Next.js+EC2.md)
