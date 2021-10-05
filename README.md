<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">파노 배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# 파노의 deploy book

## 1. 나의 배포 경험

- 레벨1-2 과제: Github Page, Netlify, Heroku
- 레벨3 프로젝트: AWS EC2 + Docker + Github Actions
- 레벨4 애플 클론코딩: AWS S3 + Cloudfront

## 2. AWS에서 SSR, CSR에 따른 배포 전략

- CSR이 CDN배포가 권장되는 이유'

  - CSR은 정적파일을 serve하는 것 외에 별다른 서버의 동작이 필요하지 않다. 이는 CDN으로도 충분한 일이다.

  - CDN은 일반적으로 세계각지에 데이터센터를 두어 자체적인 캐싱레이어를 갖고 있다. 사용자는 본인과 가까운 센터에 접근해, 보다 빠르게 캐싱된 컨텐츠에 접근할 수 있다.

  - CDN 프로바이더가 배포서버를 관리하는 셈으로, 개발자는 트래픽 부하 등의 서버 이슈에 대해서 자유롭다.

- EC2 배포가 가지는 특징

  - EC2는 IaaS로 클라우드 프로바이더가 미리 설정해둔 옵션이 제공되는 PaaS에 반해, 배포에 필요한 모든 설정을 개발자가 직접 해야 한다.

  - 정적파일을 배포하는 것에서 나아가 추가적인 배포 작업이 필요할 경우, EC2배포를 이용해야한다. (SSR 등)

  - CDN이 가지는 캐싱의 이점은 갖고있지 않다.

## 3. 마크업한 결과물을 배포하고 그 과정 기록하기

- 애플웹사이트 S3+Cloudfront로 배포하기

  1. 배포용 S3 버킷 생성

     - ![image](https://user-images.githubusercontent.com/44419181/134805716-80250ee4-edf8-44a8-8a3c-b8337faaaff5.png)

  2. 버킷에 배포할 프로젝트 파일 업로드

     - ![image](https://user-images.githubusercontent.com/44419181/134805820-49230189-3c49-48bd-9637-f28f4014c0e4.png)

  3. CloudFront 배포 생성

     - ![image](https://user-images.githubusercontent.com/44419181/134805905-d71b4aad-6ffe-45c1-b31d-ff95fe720208.png)

  4. S3 버킷을 원본 도메인으로 설정

     - ![image](https://user-images.githubusercontent.com/44419181/134805947-f9a6cc4c-2a52-42be-b0b0-6158a632f890.png)

  5. S3 버킷 액세스 'OAI 사용' 설정

     - With an OAI, CloudFront sends authenticated requests to your S3 bucket

     - ![image](https://user-images.githubusercontent.com/44419181/134805968-a6218543-6e1e-4d53-b0f2-a30fc2123026.png)

  6. Origin Shield 활성화

     - ![image](https://user-images.githubusercontent.com/44419181/134806025-7d1074c6-93c1-45a1-af66-a4530f978a6d.png)

  7. 기본값 루트 객체 index.html 설정 및 배포 생성

     - ![image](https://user-images.githubusercontent.com/44419181/134806090-ad8c8088-e4e6-4b0f-9438-03b89e23b076.png)

  - ci/cd pipeline 구축하기

    1. aws access key 발급 받기

       - ![image](https://user-images.githubusercontent.com/44419181/134807702-d779d327-fb05-49f2-ad82-99379916dc40.png)
       - ![image](https://user-images.githubusercontent.com/44419181/134807740-fd8243bb-8752-4d75-a9f1-d70b6de79495.png)

    2. github secrets에 access key, secret access key 저장

       - ![image](https://user-images.githubusercontent.com/44419181/134809761-5e5569f0-343e-4389-b963-ce95953fac62.png)

    3. github actions yaml 파일 설정

       - ![image](https://user-images.githubusercontent.com/44419181/134809874-bf8bfa91-6eb5-4e85-95a4-67f148f7b55a.png)

       - 4번째 인자가 source, 5번째 인자가 target으로 source 디렉토리의 파일들과 target 디렉토리를 동기화한다.

### nextjs로 항공사 웹사이트 컴포넌트가 있는 유닛 페이지 3개를 만든 후 EC2로 배포하기

#### EC2 인스턴스 만들고 접속하기.

1. aws ec2에 접속한다.
2. 인스턴스 시작을 누른다
    ![image](https://user-images.githubusercontent.com/44419181/136021830-bfddeb4d-fe68-464a-baf3-fe1e22ff9097.png)
3. ubuntu 20.04를 선택한다.
    ![image](https://user-images.githubusercontent.com/44419181/136021903-04f36c77-8687-4e71-9ffb-4b5275159f93.png)
4. 성능에 따라 다르나 지금은 성능을 요하지 않는 과제용 서버를 만들 것이므로, t2 micro를 선택한다.
    ![image](https://user-images.githubusercontent.com/44419181/136022196-865f6984-232f-4f7a-af93-873693a31d32.png)
5. 인스턴스 세부 정보 구성에서 인스턴스가 속할 네트워크를 지정해준다. 외부에서 접속하는 것을 가능하게 만들기 위해 퍼블릭 IP 자동 할당을 활성화해준다. 
    ![image](https://user-images.githubusercontent.com/44419181/136022554-b6bfa3ef-c733-4f6c-b6ab-db69aa8229a0.png)
6. 스토리지는 필요한 만큼 여유있게 설정해준다
   ![image](https://user-images.githubusercontent.com/44419181/136022975-5a0e36ec-30bb-4dd7-ab0f-743724cfdafc.png)
7. 인스턴스에 붙일 태그를 추가한다. Name은 인스턴스의 별칭이 된다.
   ![image](https://user-images.githubusercontent.com/44419181/136023186-a048f0af-fdfd-4259-892e-8c24748059cb.png)
8. 보안 그룹을 구성한다. 웹서버를 배포할 것이므로, 80/443포트를 열고, 원격접속을 위해 22포트를 연다.
   ![image](https://user-images.githubusercontent.com/44419181/136023601-fbfbfe3a-9824-40c8-863b-2f3b996f58ee.png)
9. 시작하기를 누르면, 원격접속을 위해 키를 발급해준다. 기존의 키를 사용할 수도 있다.
  ![image](https://user-images.githubusercontent.com/44419181/136023828-1f1bd2b7-c087-4c58-843b-1625842ef9e2.png)
10. 태그에 추가했던 Name을 검색해보면 인스턴스가 생성된 것을 확인할 수 있다.

    ![image](https://user-images.githubusercontent.com/44419181/136024915-4665cd3f-7625-4321-b2fa-8d4c525fdd36.png)
    
11. 연결을 누르면, 인스턴스에 원격으로 접속할 수 있는 방법이 나열된다.

  ![image](https://user-images.githubusercontent.com/44419181/136025136-f23b89c3-69de-4fff-94f9-bfd177dae23a.png)

12. ssh -i [pem파일] [계정이름:ubuntu]@[ip] 를 입력하면 인스턴스에 접근할 수 있게된다.
  
  ![image](https://user-images.githubusercontent.com/44419181/136026232-96001290-0ac5-48bb-aecd-3f2a2ca2f849.png)


#### 웹접근성 과제 React 프로젝트 Next.js로 포팅하기

1. next를 의존성 설치한다. 
```sh
npm install next react react-dom
# or
yarn add next react react-dom
```

2. npm/yarn 스크립트를 다음과 같이 변경한다.

```sh
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

3. webpack 관련 디펜던시들을 package.json에서 확인한 후 제거한다.

  변경 후
  ![image](https://user-images.githubusercontent.com/44419181/136038459-e704f8cc-696b-4cab-9a5c-5daea99d8ed6.png)

4. 디렉토리 구성 및 페이지 컴포넌트를 next.js에 맞게 변경한다.

![image](https://user-images.githubusercontent.com/44419181/136038725-3e848ebc-1f50-46f7-8e62-04b8c6476a2b.png)


#### 배포하기 

1. https 처리를 위해 nextjs 커스텀서버를 구성해줍니다. ssl인증서는 개발목적이라면 openssl을 이용하세요.

![image](https://user-images.githubusercontent.com/44419181/136057484-f40a85c7-394a-4d8e-bb4c-e60923f5d35f.png)

2. github 저장소에 push하고, ssh를 통해 인스턴스에 접속해 프로젝트를 클론합니다.

3. 인증서를 scp 등의 명령어로 인스턴스의 /etc/ssl 디렉토리로 옮깁니다.

3. node.js, npm, yarn을 설치합니다

```sh
sudo apt update
sudo apt i nodejs npm
sudo npm i -g n yarn
sudo n stable
```

4. 의존성 설치를 진행합니다.

```sh
yarn
```

5. nextjs 어플리케이션을 빌드합니다

```sh
yarn build
```

6. 서버를 실행합니다. nohup은 hangup 시그널(logout시 발생)에도 종료되지 않도록하는 프로그램입니다. 마지막의 &는 백그라운드에서 실행하라는 키워드입니다.

```sh
 sudo nohup node server.js &
```


7. 의도한대로 동작합니다.
![image](https://user-images.githubusercontent.com/44419181/136058032-131111e2-444c-453c-8c31-d9db18d2b75a.png)
