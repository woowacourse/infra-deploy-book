<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">크리스의 배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

## **1. 나의 배포 경험**

### 그냥 아무 기능 없이 웹 사이트만 보여주면 된다 - S3

과거에 웹 프론트엔드 개발을 공부한지 얼마 안 되었을 때는 '배포'라는 개념도 희미했다. 단순히 내가 만든 웹 사이트에 바로 접근할 수 있는 링크를 만들고 싶을 뿐이었다. 그때 처음 알게 된 서비스가 AWS S3 가 제공하는 정적 호스팅 기능이었다. 사용법은 정말 간단하다. 그냥 index.html 이 위치한 폴더 자체의 내용물을 S3 안으로 밀어넣고 객체 권한을 모두 퍼블릭으로 설정하면 끝이었다.

거기에 더해 S3 는 자원의 메타데이터를 직접 수정할 수 있는 기능을 제공한다. 이를 통해 Cache-Control: max-age 와 같은 자원의 헤더 속성을 변경하면 각각의 자원들에 서로 다른 캐싱 설정을 적용해줄 수 있다.

S3 외에도 Netlify, Firebase Hosting 을 사용할 수도 있다. Netlify 와 Firebase 모두 웹에서 직접 정적 배포에 관한 다양한 설정들을 쉽게 할 수 있고 배포 사이트와 github 레포지터리를 연동하는 등의 유용한 부가기능을 제공한다.

<br>

### 백엔드 프론트엔드 모두 내가 배포해야 한다 - EC2, Docker

본인이 프론트엔드 개발자라면 백엔드 서버까지 본인이 직접 구축해서 배포해야할 필요가 있는 상황이 많지 않을 것이다. 그러나 본인의 사이드 프로젝트에 필요한 백엔드 서버가 필요한 경우, 풀스택을 목표로 백엔드 개발 또한 공부하고 있는 경우엔 본인이 직접 서버 또한 배포할 필요가 생긴다. 내 경우엔 직접 만든 Node.js + MySQL 기반의 API 서버를 가상 컴퓨팅 환경에 직접 배포했던 경험이 있다.

EC2 와 같은 가상 컴퓨팅 환경에 직접 Node.js 와 MySQL 을 비롯한 프로그램을 직접 설치하는 것은 시간도 많이 들고 꽤나 귀찮은 일이다. 게다가 개발은 내 로컬에서 진행했기 때문에, 문제가 생기지 않으려면 개발이 완료된 시점의 로컬 개발 환경과 동일한 환경을 가상 컴퓨팅 환경에 조성해야 하는데, 이것도 꽤나 골치 아픈 일이다. 

이 문제를 해결하기 위해 도입한 Docker 는 현재 내 개발환경을 그대로 가상 컴퓨팅 환경에 옮기는 것을 가능하게 해줬고, Docker-Compose 기능을 이용하면 따로 서버의 환경 변수나 각종 설정을 가상 컴퓨팅 환경 명령어 한번으로 수행할 수 있었다.

<br>

### 그냥 배포하면 끝이 아니라 CDN 과 캐싱 전략을 적용해야 한다 - Cloud Front

전 세계 사람들을 고객으로 하는 서비스는 하나의 오리진 서버만 두는 것이 아니라 CDN 을 두고 그것의 캐싱 기능을 활용하는 것이 필수적이다. 이때 AWS 의 Cloud Front 서비스를 이용하면 전 세계의 CDN을 내 서비스에 활용할 수 있었고, 내 웹 자원들에 대한 캐싱전략을 간편하게 적용할 수 있었다. 내 자원들을 gzip 과 같은 형식으로 자동으로 압축까지 해서 전달해주므로 쓰지 않을 이유가 없는 서비스였다.

<br>

### 쉽고 빠르게 배포를 자동화 해야 한다 - Github Actions

매번 배포를 수동으로 하는 건 말할 필요도 없이 피곤하고 비생산적인 일이다. 개인 프로젝트를 진행할 때는 수동으로 배포하는게 정말 별 것이 아닌 것처럼 느껴졌지만 팀 프로젝트를 한번 겪어보니 그 필요성을 크게 깨달을 수 있었다. 개인 프로젝트나 소규모 프로젝트의 경우엔  Github Actions 을 통한 배포 자동화를 추천한다. 별도의 비용없이 github를 통해서 간단하게 .yaml 파일 하나만 작성해도 전체 배포 자동화를 수행할 수 있기 때문이다.

<br>

### 기업이나 팀이 주로 쓰는 자동 배포 도구를 사용해야 한다 - Jenkins

하지만 내가 들은 바에 의하면, 현업에서 가장 많이 쓰는 자동 배포 도구는 Github Actions 가 아니라 젠킨스였다. 젠킨스는 직접 설치해야 하는 프로그램이기 때문에 배포 자동화가 어느 시간이든 이루어질 수 있게 하려면 젠킨스 프로그램이 돌아갈 EC2 와 같은 별도의 컴퓨팅 자원이 필요하지만 수많은 플러그인과 체계적인 파이프라인 관리 방법, 세밀한 배포 관련 설정 등 Gihub 에 비해 강력한 기능들을 제공하기 때문에 Github Actions 과 같은 자동 배포 서비스보다 현업에서는 더 많이 쓰이는 추세인 것으로 보인다.

특히 백엔드는 프론트엔드와 다르게 사용하는 인프라들이 다양하고 단순히 서버 배포 외에도 많은 일들을 자동화하기 때문에 Github Actions 보다는 더 선택지가 많은 젠킨스를 쓰는 경우가 많았다. 팀에서 사용하는 자동 배포 도구를 사용하는 것이 다른 팀원들 또한 프론트엔드의 배포 자동화 상황과 각종 설정들을 조회하는데 유리하게 작용할 수 있음을 알게 되었다.

<br><br>

## 2. CSR 배포전략

### 추천 적용 기술

- S3
- CloudFront
- Github Actions

<br>

### CSR이 CDN배포가 권장되는 이유

- CSR 은 기본적으로 HTML, CSS, Javascript 코드와 이미지와 같은 정적 파일들만을 바탕으로 수행된다. 이미 서비스 개발이 1차적으로나마 완료된 상황이라면 소스코드를 비롯한 정적 파일들이 바뀌는 경우가 적기 때문에 CDN 서비스를 통해 캐싱을 적용하는 것이 현명하다
- CDN 이 오리진 서버가 전달해야할 파일들을 캐싱을 통해 대신 전달해주기 때문에 오리진 서버의 부담을 줄일 수 있고 클라이언트가 캐시된 웹 자원을 가져다 쓰게 되기 때문에 로딩 속도도 더 빨라지기 때문이다.

<br><br>

## 3. SSR 배포전략

### 추천 적용 기술

- EC2
- CloudFront
- Jenkins

<br>

### EC2 배포가 가지는 특징

- EC2 배포는 가상 컴퓨팅 환경에서 서버 프로그램을 가동시키는 것이기 때문에 로컬에서 할 수 있는 거의 모든 일을 수행할 수 있다는 특징이 있다.
- 정적 자원 전달용 서버 외에도 서버 뿐만 아니라 DB를 직접 구축할 수 있다.
- Docker 를 이용한다면 하나의 가상 컴퓨팅 환경에서 여러 구동 환경을 조성하는 것이 가능하다.
- 타 업체의 호스팅 서비스에 의존하게 되는 정적 호스팅을 사용하는 배포 방식과는 달리 직접 보안, 네트워크와 관련된 여러 설정을 직접할 수 있다.

<br><br>

## 4. 애플 웹사이트의 CSR 배포

<br>

## [데모 링크](https://djyf65mwvoz5z.cloudfront.net)

<br>

### S3 버킷 생성

![image](https://user-images.githubusercontent.com/32982670/135931367-e9cc6889-42b0-472d-8975-7fe1b697fcaf.png)

가장 먼저 할 일은 웹 사이트의 정적 파일을 담을 버킷을 생성하는 것이다. 위치는 국내로 하고 버킷 이름을 지정한 다음 생성한다. 이때 버킷의 이름을 나중에 붙일 도메인 이름과 동일하게 하는 것이 추천된다. cloudfront 를 이용해서 도메인 이름을 웹사이트에 부여하는 방법도 있겠지만 Route 53 과 같은 서비스를 이용하려면 이러한 형식이 필수적이기 때문이다.

![image](https://user-images.githubusercontent.com/32982670/135931378-c75611f3-785a-474f-8390-161f3bcba1f9.png)

여기서 객체(파일)들의 퍼블릭 액세스는 모두 차단시킨다. 물론 이렇게 하면 S3 의 정적 호스팅 기능을 이용할 수 없겠지만 CloudFront 를 통해 호스팅을 수행하면 되므로 차단하도록 하자.

### 클라우드 프론트 CDN 배포

버킷을 만든 후에는 바로 클라우드 프론트로 넘어가 CDN 을 등록해주도록 하자. 자세한 CloudFront 사용법은 아래 링크를 참고하길 바란다. 원본 도메인을 버킷의 정적 호스팅 URL로 설정해주기만 하면 끝난다.

 [Cloud Front Quick Start](https://www.notion.so/Cloud-Front-Quick-Start-ef1eacc68a764e01b60cc46f2103b80b) 

![image](https://user-images.githubusercontent.com/32982670/135931401-5e80bc57-3a60-478a-9858-494c0391575f.png)

![image](https://user-images.githubusercontent.com/32982670/135931415-e11f4209-27ef-4348-bcca-5a6a96484014.png)

생성한 버킷이 퍼블릭 엑세스가 차단되어 있기 때문에 클라우드 프론트 배포 인스턴스에서 만큼은 해당 버킷에 접근할 수 있게 하는 예외 규칙을 S3에 추가해줄 필요가 있다. 이를 S3 에 직접할 필요는 없고 OAI 라는 액세스에 필요한 ID 값을 기존 것을 재사용하거나 새로 생성해서 지정해주기만 하면 된다. 이때 반드시 버킷 정책이 바로 업데이트 되도록 '예, 버킷 정책 업데이트'를 체크해주도록 하자.

![image](https://user-images.githubusercontent.com/32982670/135931432-6823257a-e00f-4b9a-8346-ec6cb64907ee.png)

이번 웹사이트는 항상 최신 상태로 이용자에게 보여졌으면 하기 때문에 따로 캐싱을 설정하지는 않았다. 캐싱 설정 방법 또한 아래 링크를 참고 바란다.

 [Cloud Front Quick Start](https://www.notion.so/Cloud-Front-Quick-Start-ef1eacc68a764e01b60cc46f2103b80b) 

![image](https://user-images.githubusercontent.com/32982670/135931443-732f7ae5-c028-414d-b45c-5d596bd41584.png)

모든 엣지 로케이션을 활용할 수 있도록 설정하고 기본 루트 객체를 index.html 로 설정하면 모든 준비가 끝난다. 바로 배포를 시작해주도록 하자.

![image](https://user-images.githubusercontent.com/32982670/135931452-23506af6-4c03-48e3-b5d9-13a931924093.png)

배포가 완료되기 까지 약 3분 정도 소요된다.

![image](https://user-images.githubusercontent.com/32982670/135931468-e503e44c-2241-4551-90dc-e528f287dddc.png)

배포가 완료된 이후 도메인에 접속해보면 배포가 정상적으로 이루어졌음을 확인할 수 있다.

## 5. 항공사 웹사이트의 SSR 배포

<br>

## [데모 링크](http://15.164.103.247/)

<br>

### 인스턴스 생성 및 기본 설정

가장 먼저 할 일은 EC2 인스턴스를 생성하는 것이다. EC2 페이지에서 '인스턴스 시작' 버튼을 눌러 인스턴스 생성 페이지로 이동하도록 하자

![image](https://user-images.githubusercontent.com/32982670/135931924-3dc43ce0-9241-4f96-ab22-00abb40fab67.png)

OS 는 Ubuntu 의 LTS 버전, 인스턴스 유형은 본인이 비용을 감당할 수 있는 선에서 선택한다. 

<br>

### EC2 네트워크 설정

![image](https://user-images.githubusercontent.com/32982670/135931939-cb7d43f6-fcb9-4eed-9b36-99ba2c940402.png)

그 후에는 EC2가 어느 네트워크에 속할 것이며 그 네트워크 속의 어느 서브넷에 속할 것인지를 설정해야 한다. EC2가 속하게 될 네트워크를 **VPC(Virtual Private Cloud)**라고 하는데, 이는 정해진 이용자만이 접근할 수 있는 AWS 내부망이라고 말할 수 있다. 그리고 이 VPC 안에서 한번 더 그룹을 나눌 수 있는데 이를 **서브넷**이라고 부른다.

만일 이 EC2 인스턴스 안에서 외부와 공개적으로 통신할 서버를 만들 예정이라면 퍼블릭 IP 자동 할당을 활성화시키는 것이 좋다. 외부에서 접근할 수 있기 위해서는 어쨌든 퍼블릭 IP가 필요하기 때문이다.

<br>

### 태그 추가

![image](https://user-images.githubusercontent.com/32982670/135931950-99f442e5-5a2f-418c-b86e-cbe6ce740ea1.png)

태그를 추가하면 지금 생성하는 것 외에도 많은 EC2 인스턴스들이 존재할 때 유용하게 써먹을 수 있다. 당장 Name 만 추가해도 EC2 인스턴스를 검색할 때 키워드 검색을 통해 더 손쉽게 인스턴스를 사용할 수 있다.

<br>

### 보안 그룹 구성

보안 그룹 구성이라고 다소 복잡한 제목이 붙어있지만 간단하게 말해서 이 EC2 인스턴스에 어떤 프로토콜과 포트를 통해서 누가 접근할 수 있는지를 지정하는 것이다. 참고로 0.0.0.0/0 이라고 지정하면 IP 와 상관 없이 지정된 프로토콜과 포트번호로 접근하는 모든 사람의 접근을 허용한다는 뜻이다.

![image](https://user-images.githubusercontent.com/32982670/135931962-f730ba6f-008d-49e4-8511-68e0271b1f5c.png)

이제 '검토 및 시작'을 누르고 지금까지의 입력에 문제가 없는지를 확인한 다음 '시작하기' 버튼을 눌러 인스턴스를 생성한다.

인스턴스를 생성했다면 AWS로부터 pem 키를 발급받는다. 이는 간단히 말해 EC2 인스턴스에 접속하기 위한 패스워드라고 보면 된다. 보안 설정이 잘 되어 있다면 pem 키가 있다고 해도 지정된 ip 외에는 접근을 허용하지는 않겠지만, 어찌되었든 탈취 당하면 보안에 구멍이 생길 수 있으니 잘 보관하도록하자.

<br>

### 인스턴스 접속

윈도우를 쓰고 있다면 파워쉘을 이용해서 바로 EC2에 SSH로 접근할 수 있다. 

![image](https://user-images.githubusercontent.com/32982670/135931971-56d7c237-9a31-4c2b-bdad-b52291eca3f5.png)

AWS가 친절하게도 자세한 접근법을 가르쳐주고 있기 때문에 이대로만 하자. 일단 파워쉘을 키고 pem 키 파일이 위치한 경로로 이동한다.

![image](https://user-images.githubusercontent.com/32982670/135931980-16a4fdba-ad25-4880-8bcc-17cb0dc2bf3d.png)

안내해준 ssh 접속 명령어를 그대로 입력하면 보이는 바와 같이 접속에 성공하게 된다.

<br>

### 로컬에 Docker Desktop 설치

![image](https://user-images.githubusercontent.com/32982670/135931996-5aa0feaf-2904-4894-9267-a4b1f6f84315.png)

도커를 본격적으로 활용하기 전에 권유하고 싶은 것은 본인의 로컬에도 도커를 설치해보고 개발 환경 또한 도커를 통해 구성해보는 것이다. 이렇게 구성한 개발환경은 이미지로 도커 허브로 옮겨서 EC2 인스턴스를 비롯한 많은 곳에서 그대로 사용할 수 있게 도와준다.

뿐만 아니라 Docker-Compose 를 비롯한 명령어가 잘 동작하는 지를 EC2 에 접근하기 전에 미리 테스트해 볼 수도 있다. Docker Desktop 이 정상적으로 설치되었다면 docker 를 터미널에 입력했을 때 다음과 같은 화면을 볼 수 있을 것이다.

![image](https://user-images.githubusercontent.com/32982670/135932002-52fa72af-3317-4d61-84a2-2c6e259ab0fe.png)

<br>

### 프로젝트 구조

![image](https://user-images.githubusercontent.com/32982670/135932015-2a2ae3b6-c38a-4cd6-9731-22dccf2d1b55.png)

Docker Compose 기능을 사용하기 위해 구조를 위와 같이 구성한다. docker-compose 기능을 사용하고 싶다면 프로젝트 폴더 밖에 docker-compose.yml 파일을 두는 것을 명심하자.

<br>

### docker-compose.yml 구성

```docker
version: '3.7'

services:
  ssr:
    build: ./ssr
    ports:
			# 로컬의 80 포트를 컨테이너의 3000 포트와 연결
      - '80:3000'
    # 컨테이너가 작동을 멈췄을 경우
    # 자동으로 재시작
    restart: on-failure
```

본래라면 Dockerfile 을 만들고 이를 바탕으로 이미지를 만든 다음 해당 이미지로 컨테이너를 생성하고 복잡한 명령어를 통해 활성화시키는 식으로 도커를 사용한다. 하지만 docker-compose 를 이용해서 이미지와 컨테이너 생성 및 활성화를 동시에 명령어 한번으로 수행할 수 있다. docker-compose 는 본래 여러 개의 컨테이너를 체계적으로 구성하기 위한 기능이기 때문에 지금처럼 한 개의 컨테이너를 올리는데 사용하기엔 조금 오버 엔지니어링이라고도 볼 수도 있다. 그러나 위와 같은 편의성을 제공해주기 때문에 적용하지 않을 이유는 없다. 후에 API 서버 또한 도커를 통해 운영하려는 계획이 있거나 다른 nginx 프록시 서버 등을 위해 여러 개의 컨테이너를 올릴 때 미리 docker-compose 를 이용해서 전체 구조를 구성했다면 진행이 수월해지는 강점도 있다.

<br>

### Dockerfile 구성

각각의 필드에 대한 설명은 아래의 링크를 참고하길 바란다.

[https://www.daleseo.com/dockerfile/](https://www.daleseo.com/dockerfile/)

```docker
FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN yarn

RUN yarn build

EXPOSE 3000

ENTRYPOINT [ "yarn", "start" ]
```

위의 내용을 간단하게 설명하자면 아래와 같다.

- node.js 14 버전을 설치
- /usr/src/app 디렉터리로 이동
- 로컬에 있는 파일들을 도커 컨테이너의 현재 위치로 복사
- yarn
- yarn build
- 3000 포트 개방
- yarn start 로 서버 개방

이제 docker-compose.yml 파일이 위치하는 경로로 가서 아래의 명령어를 입력한다.

```bash
docker-compose up
```

![image](https://user-images.githubusercontent.com/32982670/135932037-a6e5de38-5633-46c0-b010-6ccf6f54f1a7.png)

![image](https://user-images.githubusercontent.com/32982670/135932049-e774ba3c-5de0-4e16-949f-23dd3d173faa.png)

컨테이너 생성 및 활성화가 완료된 것을 확인했다면 다음 단계로 넘어간다.

<br>

### 컨테이너에 Docker 설치 & 리포지터리 clone

이제 EC2 인스턴스에도 docker 를 설치한다. 설치법은 아래 링크를 참고하기 바란다.

[https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)

참고로, docker-compose 는 리눅스에서는 기본으로 설치되지 않기 때문에 직접 설치해주어야 한다.

![image](https://user-images.githubusercontent.com/32982670/135932090-1d83b2cc-2058-4e3f-97ad-d35122fba602.png)

![image](https://user-images.githubusercontent.com/32982670/135932099-05018b4f-9d9c-4927-a387-c39287d66e98.png)

이제 깃허브에 올린 리포지터리를 클론해서 가져온다. 위의 구조대로 되어있는지 확인한다.

![image](https://user-images.githubusercontent.com/32982670/135932105-a3fd4bab-8448-4fa3-99ba-a437029a2bf8.png)

<br>

### Docker-Compose 실행

이전과 마찬가지로 docker-compose 를 실행한다. 참고로, -d 옵션을 주어 백그라운드에서 실행되도록 만들수도 있다. 이때 앞에 sudo 를 붙여줘야 한다.

![image](https://user-images.githubusercontent.com/32982670/135932121-8ae69505-d25f-4dfc-8de4-b712a1f18c21.png)

이제 배포되어 돌아가고 있는 Next.js 서버를 볼 수 있다.
