<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">OO 배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# 티케의 deploy book

## 1. 나의 배포 경험

- 레벨1의 자동차경주, 로또, 지하철, 레벨2의 로또 미션은 `github-pages`를 활용해서 배포했습니다.
- 레벨2의 유투브 미션과 토이 프로젝트는 `netlify`로 배포했습니다.
- 레벨2의 쇼핑 카트, 지하철 미션은 `heroku`를 통해서 배포했습니다.
- 주절주절 팀 프로젝트는 `Cloudfront + S3`를 통해서 배포했습니다.

## 2. AWS에서 SSR, CSR에 따른 배포 전략

- CSR이 CDN배포가 권장되는 이유
  - CDN이란 Content Delivery Network의 약자로, 지리적 제약 없이 전 세계 사용자에게 빠르고 안전하게 콘텐츠를 전송할 수 있는 콘텐츠 전송 기술을 의미한다.
  - CDN은 서버와 사용자 사이의 물리적인 거리를 줄여 콘텐츠 로딩에 소요되는 시간을 최소화한다.
  - CSR로 만든 프로젝트가 변동 가능성이 없는 정적 파일들로 되어있다면 CDN에서 캐싱되어 있는 정보를 가져오는 것이 유리하다.
- ## EC2 배포가 가지는 특징
  - 사용자에 따라서 원하는 환경 다양한 가상 컴퓨팅 환경을 제공한다.
  - 또한 사용자가 인스턴스를 완전히 제어할 수 있다. (중지, 시작, 삭제)
  - 보안 및 네트워크 구성, 스토리지 관리를 직접하지 않아도 되며, 제공해주는 기능들이 충분히 효과적이다.

## 3. 마크업한 결과물을 배포하고 그 과정 기록하기

- 애플웹사이트 S3+Cloudfront로 배포하기

  1. S3 버킷 생성
     - 버킷 생성
     - 버킷이름 입력 및 리전 선택
     - 모든 퍼블릭 액세스 차단
     - 버킷 만들기
  2. 정적 웹 사이트 호스팅 설정 변경
     - 만든 버킷 선택
     - 속성 탭의 가장 하단의 '정적 웹 사이트 호스팅'의 편집 선택
     - 정적 웹 사이트 호스팅 활성화
     - 인덱스 문서에 index.html 입력
     - 변경사항 저장
  3. S3에 객체 업로드
  4. CloudFront 배포 생성
     - CloudFront 페이지로 이동
     - 배포 생성 버튼 선택
     - 원본 도메인에서 1번에서 생성한 S3 버킷 선택
     - S3 버킷 엑세스에서 '예, OAI 사용' 선택
     - 원본 액세스에서 '새 OAI 생성'
     - 버킷 정책에서 '예, 버킷 정책 업데이트'
     - Origin Shield 활성화를 '예'로 설정 -> 아시아 태평양(서울) 선택
     - 뷰어 프로토콜 정책에서 'Redirect HTTP to HTTPS' 선택
     - 배포 생성
  5. 오류페이지 설정
     - 사용자 정의 오류 응답 생성 선택 (404, 403)
     - 응답 페이지 경로 : index.html
     - HTTP 응답 코드 : 200 확인
  6. [배포된 애플사이트](https://d24i2g98ey4bje.cloudfront.net/)

- ## nextjs로 항공사 웹사이트 컴포넌트가 있는 유닛 페이지 3개를 만든 후 EC2로 배포하기

  1. EC2 인스턴스 생성하기
     - 인스턴스 시작 선택
     - 원하는 Amazon Machine Image(AMI) 선택
     - 인스턴스 유형 선택
     - 인스턴스 세부 정보 구성
       - 퍼블릭 IP 자동 할당 활성화
     - 태그 추가에서 인스턴스 태그 추가하기(선택)
     - 보안 그룹 구성
     - 키페어 생성 (✔️ 꼭 안전한 곳에 저장하기)
     - 인스턴스 시작
  2. EC2 인스턴스 연결
     - 생성한 인스턴스 선택
     - 우측 상단에 '연결' 선택
     - SSH 클라이언트 선택
       - 나온 명령어를 터미널에서 시행
  3. 노드 설치
     - NVM을 통해서 Node.js 설치
       ```
         sudo apt-get update
         curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
         . ~/.nvm/nvm.sh
         nvm install node
       ```
  4. 프로젝트 클론받기
     - 특정 브랜치에서 작업했다면 그 브랜치만 다운 받는 것이 편하다
       ```
       git clone -b tyche-step1 --single-branch https://github.com/devhyun637/a11y-airline.git
       ```
  5. 프로젝트 빌드하기
  6. Reverse Proxy 설정

     ```
      sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
     ```

  7. 무중단 배포를 위한 pm2
     ```
     npm install pm2 -g
     pm2 start npm --name "next" -w -i max -- start
     ```
  8. [배포된 항공사 컴포넌트](http://ec2-52-78-168-33.ap-northeast-2.compute.amazonaws.com/spinbutton)
