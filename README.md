<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">OO 배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# 콜린의 deploy book

## 1. 나의 배포 경험

- github pages
    - 심플하게 배포할 수 있음
    - level1,2의 간단한 미션에서 적용
- netlify
    - 배포 방법도 무지 간단함.
    - ci/cd를 자동으로 해준다는 점이 가장 매력적이었음
    - JS 유튜브, 지하철, react 지하철에서 사용
- heroku
    - 간단한 배포에 적합.
    - 일정 시간 요청이 없으면 sleep 상태로 전환됨. 최초 접속까지 오래 걸림
    - react 쇼핑카트 사용(json-server를 직접 구축하여 heroku로 배포하는 예제가 있어 참고하면서 진행)

## 2. AWS에서 SSR, CSR에 따른 배포 전략

### CSR이 CDN배포가 권장되는 이유

- CSR의 경우 문서 구조 및 내용(contents)에 대한 렌더링을 브라우저(사용자) 측에서 진행함
- 문서를 구성하기 위한 재료들을 서버 측에 요청해야함 (html, css, js, 기타 정적 자원들)
- 일종의 캐시 서버인 CDN을 통해 위의 정적 자원들을 더 빠르게 가져올 수 있음

### EC2 배포가 가지는 특징

- 하나의 컴퓨터 자원을 사용한다고 생각하면 됨
- 컴퓨터 자원과 관련된 모든 것을 사용자가 직접 컨트롤할 수 있음 ⇒ 서비스 하려는 서버의 성격에 따라 각각의 자원을 적절하게 분배
- 하나의 웹 어플리케이션 서버가 될 수도 있고, DB 서버가 될 수 있고 다양한 측면에서 사용이 가능

## 3. 마크업한 결과물을 배포하고 그 과정 기록하기

### 애플웹사이트 S3+Cloudfront로 배포하기

[배포 링크](https://d1hcg5rhqfhcop.cloudfront.net/)

**과정**

1. S3 버킷 만들기
    - 버킷 이름 설정, AWS 리전 선택
2. 생성한 버킷에 파일 업로드 하기
    - 최종 배포 결과물의 폴더 및 파일 구조와 동일한 형태로 업로드를 진행해야함
    - 이번 미션에서는 수동으로 수행하였지만, github action을 활용하여 해당 작업을 자동화 시킬 수 있음
3. 클라우드프론트로 배포 진행하기
    - 원본 도메인 설정 - 이전 단계에서 구축해놓은 S3 선택하기
    - S3 버킷 엑세스 설정(OAI) - 해당 버킷에 접근하기 위한 권한 ID 생성 및 적용.
        
        ⇒ 결과적으로 S3의 버킷 정책을 살펴보면 접근 권한이 업데이트 된 것을 확인할 수 있음
        
    - 기본 캐싱 동작 설정 - 기본 값으로 설정
    - 캐시 키 원본 요청 - Caching Optimized 사용
        - TTL: 기본 86,400초
        - 압축 - Gzip & Brotli
4. 클라우드프론트로 사용자 정의 오류 응답 편집하기
    - 400, 404응답에 대해 `index.html` 를 리다이렉트 하도록 설정
    - 오류 응답 사용자 정의 YES → 응답 페이지 경로 (`/index.html`) & HTTP 응답 코드 (`200`)
5. 배포된 도메인 확인 후 접속

### nextjs로 항공사 웹사이트 컴포넌트가 있는 유닛 페이지 3개를 만든 후 EC2로 배포하기

[배포 링크](http://2sooy-next-deploy.p-e.kr/)

**과정**

1. EC2 인스턴스 생성하기
    - AMI(Amazon Machine Image) 선택 -  Ubuntu Server 18.04 LTS
    - 인스턴스 유형 선택 - t2.micro
    - 인스턴스 세부 정보 구성
        - 네트워크 설정 - `TECHCOURSE` 네트워크 설정
            - 현재 생성하는 EC2 자원은 우아한 형제들 측에서 제공하는 자원
            - 불특정 IP에서 접속하는 것을 방지하고자, 미리 각자 크루의 IP를 받아 해당 IP만 인스턴스에 접근할 수 있도록 허용한 네트워크
        - 퍼블리 IP 자동 할당 - `활성화` ⇒ 해당 인스턴스 자원에 접근할 수 있는 공공 IP를 자동을 할당
    - 스토리지 추가 - 기본값 사용
    - 태그 추가 - Name: EC2-2sooy
        - 인스턴스의 경우 불특정 문자열이기 때문에 각각의 인스턴스를 구분하기 쉽도록 태그 지정
    - PEM키 생성하기
        - EC2에 터미널 등을 활용하여 접속할 때 필요한 개인 키 생성하기
    - 인스턴스 생성 완료
2. 인스턴스 연결하기 by SSH
    - ssh -i [PEM 키] [EC2 서버]
    - ex) `ssh -i "EC2-key-2sooy.pem" ubuntu@192.168.0.5`
3. EC2에 next 배포하기
    - node 설치
        
        ```sh
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
        . /.nvm/nvm.sh
        nvm install node
        node -v
        npm -v
        ```
        
    - next로 배포할 repo 클론하기
        - 패키지 설치 및 빌드
    - 포트 리다이렉트 하기
        - iptables
            
            ```sh
            sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
            ```
            
        - ec2 인스턴스는 네트워크 설정에 의하여 80 포트 열려있는 상황
        - next 서버는 3000번의 포트가 열려있는 상태
        - 외부에서의 EC2로의 모든 요청은 80으로 접속하게 된다. 그러나, next 서버는 3000번이 열려있기 때문에 80포트로 접속하는 포트는 3000번으로 변경이 필요함
    - PM2를 활용하여 서버를 지속적으로 활성화 시키기
        - 코드
            
            ```sh
            npx pm2 start yarn --name "next" -- start
            ```
            
        - 일반적으로 EC2에 next 서버를 띄워도 터미널을 종료하게 된다면 next 서버는 종료된다.
        - 터미널 종료를 해도 next 서버가 지속적으로 동작할 수 있도록 PM2를 활용
