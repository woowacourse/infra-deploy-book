<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">체프의 배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# 체프의 deploy book

## 1. 나의 배포 경험

서버 컴퓨터를 직접 관리하면서 배포해야 하는 시대를 지나, 다양한 클라우드 환경에서 편리하게 배포가 가능해졌다. 프론트엔드 개발을 하면서 다양한 배포 방식을 접해볼 수 있었는데, 지금까지 어떤 배포 환경을 경험했는지 나열해보면서 특징과 장단점을 간략하게 정리해보았다.

먼저 **Static Site**를 배포했을 때 사용했던 방법 및 플랫폼이다.

### Surge ([https://surge.sh/](https://surge.sh/))

- Surge는 복잡한 설정 없이 Static Web을 간단하게 배포할 수 있는 서비스이다. Surge CLI를 설치하고 `surge` 명령어만으로 바로 배포가 가능하다. Surge 자체의 CDN에 캐시되며, 자동으로 [gzip 및 캐시 설정](https://surge.sh/help/using-lucid-caching-automatically)을 해준다. 작은 규모의 서비스를 배포할 때 사용하기 좋다.
- **장점**
    - 명령어 하나로 바로 배포할 수 있다.
- **단점**
    - 아직 한국과 가까운 서버가 없는지 배포한 페이지에 접속할 때 체감될 정도로 느리다.

### Firebase ([https://console.firebase.google.com/](https://firebase.google.com/products/hosting/))

- Firebase는 백엔드 서버를 대체할 수 있는 다양한 기능을 제공한다. 그 중에서 Hosting 기능만 이용해서 사이트를 배포할 수도 있다. Firebase 또한 CDN에 캐시된다.
- Firebase의 기능(Auth, Firestore, Storage 등)을 활용하지 않는다면, 굳이 선택할 이유는 없다고 생각한다. Github Pages나 Netlify와 같은 배포에 특화된 서비스를 사용하는 것이 더 좋을 듯하다.
- 경쟁 플랫폼으로 AWS Amplify가 있다.
- **장점**
    - `firebase deploy` 명령어 하나도 바로 배포할 수 있다.
    - 초기 설정할 때, Github Actions 설정을 자동으로 해준다.
    - `[web.app](http://web.app)` 서브도메인을 사용할 수 있다.
- **단점**
    - 프로젝트에 Firebase 관련 설정 파일이 생성된다.
    - Firebase 프로젝트를 생성하고 설정하는 과정이 조금 번거롭다.

### Github Pages

- Github에서 운영하는 정적 사이트 배포 서비스로, Github Repo에 Push만 하면 알아서 배포가 완료된다. 정적 사이트로 구성된 블로그, 혹은 프로젝트의 문서와 데모 페이지를 호스팅하는데 가장 적합하다고 생각한다.
- **장점**
    - Github Repo를 기반으로 바로 배포가 가능하다.
    - 전 세계 CDN에 캐시되어 국내에서도 빠르게 접속할 수 있다.
- **단점**
    - Private Repo에서 배포해야 할 때는 유료이다.
    - 리액트 라우터의 **BrowserRouter**를 사용하기 위해서 추가 설정이 필요하다.
    - 캐시 헤더를 설정할 수 없다.

### Netlify ([https://www.netlify.com/](https://www.netlify.com/))

- Netlify는 서버리스 배포 플랫폼으로, 정적 사이트 배포뿐만 아니라 서버리스 구성을 위한 Functions 기능이나 블로그 관리를 위한 CMS 기능 등 정말 많은 기능을 제공한다.
- 배포할 때, Github에 자동으로 연동되며, Push만 하면 바로 자동으로 빌드되어 배포된다. Webhook을 걸어주거나, Github Actions 등의 도구를 통해 배포 자동화를 구성해야 하는 번거로움이 사라진다.
- Netlify Edge라는 엣지 서버(CDN)을 통해 전 세계 서버에 캐시된다.
- 경쟁 플랫폼으로 Vercel이 있다.
- **장점**
    - 무료 플랜이 제공하는 기능이 상대적으로 많다.
    - 다양한 편의 기능을 제공한다. 예를 들어, 빌드가 자동으로 버저닝되고, 배포 프리뷰 링크를 자동으로 생성하여 제공한다.
    - 커스텀 도메인과 HTTPS를 무료로 붙일 수 있다.
    - `netlify.toml` 파일을 통해 캐시 헤더 설정도 파일별로 각각 해줄 수 있다.
    - Next.js도 배포할 수 있다.
- **단점**
    - 유료 플랜 사용 시, 가격이 상대적으로 비싼 편이다.

### AWS S3 + CloudFront

- S3(Simple Storage Service)는 파일을 저장하는 Storage 서비스, CloudFront는 CDN 서비스이다. 이 둘을 이용하면 CDN 캐시를 지원하는 정적 웹 사이트를 배포할 수 있다.
- S3에서도 자체적으로 호스팅 기능을 지원하지만 퍼블릭 액세스를 열어야 해서 보안에 취약할 수 있다.
- 또한 CDN 캐시가 되지 않아서, 리소스가 저장되어 있는 원본 S3 서버에 요청이 몰리게 되는 문제가 발생할 수 있다. 따라서, CloudFront를 함께 붙여주는 것이 좋다.
- **장점**
    - 잘 알려져 있고, 규모가 큰 클라우드 플랫폼이라 신뢰성이 높다.
    - 다른 AWS 서비스와 편하게 연동할 수 있다.
    - 상세한 설정을 할 수 있다.
- **단점**
    - 상세한 설정을 해야 한다.
        - 상황에 맞추어서 적절한 성능을 가져오기 위해서는, 각각의 S3, CloudFront 설정이 어떤 의미를 가지는지 이해해야 한다.
        - AWS에서 사용하는 용어들이 어려운 편이고, 각 AWS 서비스의 성격을 이해해야 하기 때문에 러닝 커브가 높다.
        - 배포 명령어를 구성할 수 있는 AWS CLI도 별도의 학습이 필요하다.
    - 배포 자동화 설정을 할 때, 명령어와 별도의 CI 도구(Github Actions, Jenkins 등)를 사용하여 직접 설정해주어야 한다.
    - 유료이며, 과금 플랜이 다양하고 복잡하기 때문에 적절하게 과금될 수 있도록 신경써주어야 한다.

### 체프의 Static Site 배포 선택 기준

- 자주 배포할 필요가 없는 서비스는 **Github Pages**를 이용한다. 특별한 경우가 아니라면, 보통 Github Pages를 이용한다.
    - 우테코 미션을 수행하면서 데모 페이지를 배포할 때는 보통 Github Pages를 통해 배포했다.
- 지속적으로 관리하면서 자주 배포하는 서비스는 쉽게 CI/CD를 구성할 수 있는 **Netlify**를 이용한다.
    - 현재 체프의 블로그는 Netlify를 통해 배포하고 있다.
- 누군가에게 빨리 보여주어야 해서 급하게 배포해야 하는 상황에는 **Surge**를 이용한다.
- Firebase로 인프라를 구성했을 때는 **Firebase Hosting**을 이용한다.
- 적절한 성능을 필요로 하며, 금전적인 여유가 있을 때는 **S3 + CloudFront**를 이용한다.
    - 레벨 3부터 개발하고 있는 "찜꽁" 또한 S3 + CloudFront를 통해 배포되고 있다.

다음은 서버 사이드 렌더링이 이루어지는 **Dynamic Web**을 배포했을 때 사용한 방법이다.

### Heroku ([https://www.heroku.com/](https://www.heroku.com/))

- 다양한 서버 프레임워크를 간단하게 배포할 수 있는 서비스이다. Heroku 설정 후, `git push heroku master`만 하면 바로 배포된다.
- 가장 저렴한 가격 정책이 월 7달러로 비교적 저렴하다. 사이드 프로젝트를 지속적으로 서비스해야할 때 적합하다.
- **장점**
    - 간편하게 배포할 수 있다.
    - 사용하지 않을 때는 알아서 서버가 꺼지기 때문에, 무료 사용시간을 절약할 수 있다.
    - Redis나 PostgreSQL과 같은 DB 서버도 무료 사용 정책이 있다.
- **단점**
    - 무료로 사용할 때 커스텀 도메인을 붙일 경우, HTTPS 설정을 할 수 없다.

### AWS EC2

- 가상 서버를 호스팅 받을 수 있는 VPS 서비스이다.
- 가상화 기술을 통해 서버 컴퓨터 한 대를 임대받는 것처럼 사용할 수 있다.
- 서버 컴퓨터를 직접 관리하지 않는 선에서 가장 low-level에서 설정할 수 있다. 네트워크 설정이나 OS 설정도 직접 다 해줄 수 있다.
- 리눅스의 경우, Shell을 통해서 직접 서버 관련 프로그램을 설치하고 설정할 수 있다.
- 비슷한 서비스로 Vultr, DigitalOcean 등이 있으며, 개인적으로 가성비가 좋은 Vultr를 애용한다.
- **장점**
    - 서버를 설정하고 배포할 수 있는 방법과 과정을 OS 레벨에서 알 수 있다.
    - 서버 컴퓨터에서의 OS 동작을 알 수 있다. (Linux, Windows Server 등)
    - 직접 서버 컴퓨터를 관리하지 않고 전세계의 서버를 그대로 사용할 수 있다.
    - 서비스의 규모가 커져서 더 높은 성능을 필요로 할 경우, Auto Scaling을 통해 자동으로 성능을 확장하거나 축소할 수 있다. 컴퓨팅 파워를 사용한 만큼만 비용을 지불할 수 있다는 장점도 있다.
- **단점**
    - 편의 기능이 있는 여러 배포 서비스의 기능을 포기해야 하며, 대부분의 설정을 직접 해주어야 한다.

## 2. AWS에서 SSR, CSR에 따른 배포 전략

### CSR이 CDN 배포가 권장되는 이유
- CSR은 브라우저(클라이언트)에서 html, css, js 등의 정적 파일을 로드하여 렌더하는 방식이다. 따라서, 페이지를 띄워줄 때 필요한 다양한 정적 파일들을 서버로부터 받아오게 된다.
- 이 때, 정적 파일들을 원본 서버 → CDN 분산 서버로 미리 캐시하면, 컨텐츠를 제공하는 원본 서버에 몰릴 수 있는 트래픽을 분산할 수 있으며, 가까운 위치의 CDN 서버에 요청을 보내기 때문에 더 빠르게 컨텐츠를 불러올 수 있다.
- 리소스를 CDN 서버로 한 번 캐시할 때 gzip이나 brotli 방식으로 리소스를 압축할 수 있으며, 더 작은 사이즈의 데이터를 가져오게 할 수 있다.
- 또한, 캐시 헤더 설정을 통해서 브라우저 자체가 캐시해준 파일을 사용하여 추가 서버 요청을 보내지 않도록 처리해줄 수 있다. 이를 통해 똑같은 파일을 네트워크를 통해 가져올 필요 없이, 필요한 리소스를 빠르게 가져와서 사용할 수 있다.
  
### EC2 배포가 가지는 특징
- 상단의 나의 배포 경험에 서술해두었다.

## 3. 마크업한 결과물을 배포하고 그 과정 기록하기

### 애플 웹 사이트 S3 + Cloudfront로 배포하기
- [🚀 데모 페이지](https://d2hr81hbrr85iv.cloudfront.net/)
- [📖 읽으러 가기](./deploy-with-s3-and-cloudfront.md)

### nextjs로 항공사 웹사이트 컴포넌트가 있는 유닛 페이지 3개를 만든 후 EC2로 배포하기
- [🚀 데모 페이지](https://a11y.puterism.com/)
- [📖 읽으러 가기](./deploy-next-js-with-ec2.md)
