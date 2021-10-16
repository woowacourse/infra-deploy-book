# 동동의 deploy book

서비스 성격에 따른 배포 전략

## I. 나의 배포 경험

### A. github pages

- 대규모 트래픽이 발생하지 않는 간단한 웹앱은 github pages로 배포 하는 것이 간편하다.
- github domain이 뭔가 orthodox 한 느낌을 주기 때문에 선호한다.

### B. netlify

- github와의 연동이 간편하다.
- github repository branch의 변경사항이 생기면 이를 감지하여 빌드와 배포가 자동으로 이루어진다.
- github pages는 시간당 배포횟수가 정해져 있는 반면, netlify는 시간당 배포횟수가 정해져 있지 않아 실시간으로 변경사항을 보고 싶은 경우에 유용하다.

### C. Jenkins + AWS S3 + AWS CloudFront

- 팀프로젝트에서 CI(github actions) + CD(github webhooks + Jenkins + AWS S3 + AWS CloudFront) 구축

## II. AWS에서 SSR, CSR에 따른 배포 전략

### A. CSR이 CDN배포가 권장되는 이유

- CDN을 통해서 배포된 사이트에 클라이언트가 접근하면 클라이언트와 물리적으로 가까운 엣지 로케이션에서 캐시된 정적 리소스를 가지고 올 수 있으므로 오리진 웹서버로부터 정적 리소스를 받는 것보다 빠르다.

- CSR은 일반적으로 모든 데이터를 클라이언트 사이드에서 ajax 요청을 통해서 가지고 온 후 UI를 그리며, html 파일 자체에는 js, css 등의 정적 리소스의 링크 외에 특별한 내용이 없는 경우가 대부분이다. 따라서 정적 리소스를 빠르게 클라이언트 사이드로 가지고 와야 브라우저가 렌더링을 빠르게 시작할 수 있다.

### B. EC2 배포가 가지는 특징

- EC2 에는 웹서버가 동작하고 있기 때문에, 시시각각 변경되는 데이터를 서버에서 가공한 후 클라이언트에 보내줄 수 있다.

- 하지만, API 서버 외에 웹서버를 하나 더 관리해야하므로 관리비용이 증가한다는 단점이 있다.

## III. 마크업한 결과물을 배포하고 그 과정 기록하기

### A. 애플웹사이트 S3+Cloudfront로 배포하기

#### 1. 배포의 대상이 되는 파일들 확인

- src directory 내 모든 파일

#### 2. AWS Management Console 에 로그인

#### 3. S3 bucket 만들기

1. S3 서비스로 이동
2. create bucket

- ✅ Block all public access: Cloudfront를 이용해서만 접근 가능하게 한다

#### 4. S3 bucket에 배포대상파일 업로드하기

- 생성한 bucket으로 이동
- 배포대상파일 업로드
- metadata 를 추가한다
  - index.html: `Cache-Control: public, s-maxage=31536000, max-age=0`
  - 기타 정적 자원: `Cache-Control: public, max-age=31536000, immutable`

#### 5. CloudFront 만들기

##### a) CloudFront 서비스로 이동

##### b) Create distribution

- Origin Domain: 생성한 S3 bucket 도메인(bigsaigon333-html-apple-store.s3.ap-northeast-2.amazonaws.com)
- S3 bucket access: Yes use OAI(origin access identity)
  - OAI 생성: 기존의 OAI가 존재한다면 기존 OAI를 사용할 것을 권장
  - Bucket policy: Yes, update the bucket policy
    - OAI 를 사용한다면, S3 Bucket policy를 OAI에 접근을 허용하는 것으로 업데이트하여야 한다.
    - Bucket policy를 yes로 check하면 CloudFront가 자동으로 S3 bucket의 policy를 업데이트해준다.
         no로 한다면 수동으로 직접 S3 bucket의 policy를 업데이트하여야 한다.
- Enable Origin Shield: yes
  - 추가적인 캐싱 레이어인 Origin Shield를 추가한다
   Origin Shield의 이점
  - origin 으로 가는 모든 CloudFront의 Caching Layer 요청이 Origin Shield 를 거치게 되므로 cache hit ratio 가 높아진다.
  - 동일한 객체에 대한 콘텐츠 요청을 통합하여 동시 요청 수를 줄이므로, origin(S3 bucket)에 로드를 줄일 수 있다.
  - origin에 대한 latency가 낮은 곳에 Origin Shield를 설정하면, 더 좋은 Network Performance를 얻을 수 있다.
- Compress objects automatically: yes
  - Origin으로부터 받은 파일을 자동으로 압축해서 반환한다. request 의 `Accept-Encoding`헤더를 보고 viewer가 어떤 압축 형식을 지원하는지 파악한다.
  - CloudFront는 Gzip 및 Brotli 압축 형식을 사용하여 객체를 압축할 수 있다. viewer가 두 형식을 모두 지원하는 경우, CloudFront는 Brotli를 사용한다
- Viewer: Redirect HTTP to HTTPS
  - HTTP request를 HTTPS request로 redirect하여 secure 한 통신을 할 수 있게 한다
- Cache key and origin requests: Cache policy and origin request policy (recommended)
- Enable real-time logs: No
  - Yes 설정시 CloudFront로 오는 모든 request에 대한 로그를 관리할 수 있다. IAM 롤 등 여러 제약조건으로 적용하지 못하였으나, 추후에 용해봐도 좋을 것 같다.
- Default root object: index.html
  - viewer가 root URL(/)으로 접근하는 경우에 반환할 object를 지정한다
- Standard logging: On
  - S3 bucket으로 전달된 뷰어의 request에 대한 로그를 기록한다

##### c) SPA - CSR 의 경우, Custom Error Response를 설정한다(Create custom error response)

- HTTP error code: 403 Forbidden
- Customize error response
  - Response page path: /index.html
  - HTTP Response code: 200

##### d) 배포된 사이트에 정상적으로 접근 가능한지 확인해본다

- <https://d2zwx80u2kt9kg.cloudfront.net/index.html>
- <https://d2zwx80u2kt9kg.cloudfront.net> : index.html 이 렌더링되는지 확인
- <http://d2zwx80u2kt9kg.cloudfront.net> : HTTPS 로 redirect 되는지 확인
- <https://d2zwx80u2kt9kg.cloudfront.net/login> : 존재하지 않는 path에 접근 시 index.html이 렌더링되는지 확인

##### e) 추후 배포시

- CloudFront Cache Invalidation 이 필요하다

### B. nextjs로 항공사 웹사이트 컴포넌트가 있는 유닛 페이지 3개를 만든 후 EC2로 배포하기

#### 1. 기존의 a11y-airline 을 next.js 로 마이그레이션한다

```sh
npx create-next-app
```

#### 2. EC2 콘솔로 접근하기

##### a) 로그인

```sh
chmod 400 [pem파일명]
ssh -i [pem파일명] ubuntu@[SERVER_IP]
```

##### b) 비밀번호 변경

```sh
sudo passwd ubuntu
```

##### c) nvm 설치

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash  # nvm 설치
```

※ zsh을 기본 셸으로 쓰는 경우에, 환경변수 NVM_DIR 이 shell 실행시 등록되도록 .zshrc 에 추가

- nvm 설치시 자동으로 .bashrc 에 추가된다

```shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

##### d) node.js lts 설치

```sh
nvm install --lts
nvm use --lts
```

※ troubleshooting
nvm install, nvm use 명령어 입력시 `manpath: can't set the locale; make sure $LC_* and $LANG are correct` 라는 에러 메시지가 계속 출력되었다.

`.zshrc`에 다음의 명령어를 추가한 후 `locale`으로 검증하였다

```shell
export LANG=en_US.UTF-8
export LANGUAGE=en_US.UTF-8
export LC_ALL=en_US.UTF-8
```

node.js 를 설치하면 npm 도 저절로 설치된다

```sh
$ which node
/home/ubuntu/.nvm/versions/node/v14.18.0/bin/node

$ which npm
/home/ubuntu/.nvm/versions/node/v14.18.0/bin/npm

$ npm --version
6.14.15
```

##### e) git clone

```sh
git clone https://github.com/bigsaigon333/a11y-airline.git

cd a11y-airline

npm install

npm run build

nohup npx next start -p 8080 & disown
```

※ background 에서 job을 실행시킨 채로 shell을 종료하면, shell에서 실행중인 모든 job 에 HUP signal을 보낸다.

HUP signal을 받으면 job이 종료되는데, 아래의 명령어로 실행시키면 실행된 프로세스가  HUP signal을 무시하여서, 셸 종료하여도 background에서 계속해서 동작할 수 있다.

```sh
nohup npx next start -p 8080 & disown
```

##### f) why 8080?

EC2 보안그룹 sg-08485b9cab6facf97 (SG-DEFAULT)에 의해서 3000번 port는 막혀있다. 8080포트만 열려있으므로, 8080으로 띄운다.

<https://docs.aws.amazon.com/ko_kr/codebuild/latest/userguide/build-env-ref-background-tasks.html>

##### g) port forwarding

아래의 커맨드를 실행하면 80번 port로 들어오는 http request를 3000번으로  forwarding 할 수 있어, 이를 이용하면 nextjs server 포트를 3000번으로 띄워도 된다

```sh
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
```
