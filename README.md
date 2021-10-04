<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">서니의 배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# 서니의 배포 가이드 북

* CSR이 CDN배포가 권장되는 이유

  `/* 작성중 */`

* EC2 배포가 가지는 특징

  `/* 작성중 */`



## S3 + Cloudfront로 배포하기

### S3와 Cloudfront

* S3

  `/* 작성중 */`

* Cloudfront

  `/* 작성중 */`

## Next.js, EC2를 이용하여 배포하기

>  데모 페이지 접속 : https://sunny-test.kro.kr/

### 💡 Next.js, EC2

* Next.js

  `/* 작성중 */`
* EC2

  `/* 작성중 */`

### ⚙️ EC2 인스턴스 생성하기

- aws 로그인하기
- EC2 접속 ⇒ 인스턴스 클릭 ⇒ 인스턴스 시작
- 1단계 : Amazone Machine Image 선택
  - `Ubuntu Server 18.04 LTS (HVM), SSD Volume Type` 선택
- 2단계 : 원하는 인스턴스 유형 선택
  - 표시 된 유형중에서 선택 가능
- 3단계 : 인스턴스 구성
  - 네트워크 : 사용하는 네트 워크 선택,
  - 서브넷 : 원하는 서브넷 선택
  - 퍼블릭 IP 자동 할당 : 활성화
- 4단계 : 스토리지 추가
  - 원하는 볼륨 크기를 설정 (30GiB 이상을 권장)
- 5단계 : 태그추가
  - 태그 추가 클릭
  - 키 : Name
  - 값: 원하는 인스턴스 명
- 6단계 : 보안 그룹 구성
  - 기존 보안 그룹 선택
  - 사용중인 보안그룹 선택
- 7단계 : 검토
  - 검토 후 `시작하기` 클릭
- 8단계 : 키 페어 선택
  - 기존 키 페어 선택 또는 키 페어 생성하기
  - 키 페어를 생성하는 경우 pem 키 다운받아서 잘 저장해 둘 것. (이름 예시 : KEY-{something})



### 🛠 EC2 환경에 접속하기

- pem키 다운받기

- KEY-jujeol.pem 이 저장된 디렉토리로 이동

- 하단 명령어를 이용하여 ssh 접속

  ```bash
  ssh -i KEY-jujeol.pem ubuntu@{ec2의 공개 ip주소)
  ```
  

### 🗂 Yarn(또는 Npm) 설치

```bash
sudo apt update
sudo apt upgrade

/* Yarn 설치 */
/* 출처 : https://stackoverflow.com/questions/53471063/yarn-error-there-are-no-scenarios-must-have-at-least-one | 참고 : https://classic.yarnpkg.com/en/docs/install/#mac-stable */
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn
yarn --version
>> 1.22.15

/* Node JS 설치, 12.0.0 버전 이상 - 14.x 버전 설치하였음. */
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install nodejs 
node --version
>> v14.18.0

/* git clone */
git clone

/* 패키지 설치 */
yarn
 
/* next app 배포, 포트번호 8080. 우테코에서 공개하는 포트번호는 80, 8080, 443 뿐이나, 추후에 proxy 처리를 할 것이라면 원하는 포트에 열어주면 된다. */ 
yarn build && yarn start

```



#### 🏃‍♀️ PM2 설정하기

```bash
npm install pm2
pm2 --version
>> 5.1.2

pm2 start yarn --name "{원하는 이름}" -- start
```



### 🔗 Https 설정하기

#### 📋 도메인 발급

* 발급처
  * 가비아

  * [호스팅.kr](http://xn--9t4bo31afmc.kr)

  * 내 도메인 한국 : 무료로 도메인을 얻을 수 있다.

  * 등등등..

    

* 내 도메인 한국을 이용해  도메인 발급받기
  * 로그인 후 일반 도메인 검색에 원하는 도메인 이름작성

  * `등록하기` 를 눌러 도메인 등록

  * `도메인 관리` 로 이동 → 원하는 도메인의 `수정` 클릭

  * `IP 연결(A)` 에 서버의 공개 ip 주소 입력 → 보안코드 입력 후 수정하기 클릭

  * 터미널 재접속 후 하단 명령어 입력

    > letsencrypt : 무료 SSL 인증을 제공하는 곳 (https://letsencrypt.org/)

  ```json
  sudo docker run -it --rm --name certbot \\
  	-v '/etc/letsencrypt:/etc/letsencrypt' \\
  	-v '/var/lib/letsencrypt:/var/lib/letsencrypt' \\
  	certbot/certbot certonly -d 'yourdomain.com' --manual --preferred-challenges dns --server <https://acme-v02.api.letsencrypt.org/directory>
  ```

  - 두번 yes 후 나오는 화면에 있는 key를 복사한 후 TXT에 입력 후 수정하기 클릭
    - 상단 : 도메인
    - 하단 : 키
  - 입력 후 엔터

* 도메인 등록 끝!



#### 👩‍💻 Nginx 설정

```bash
sudo apt-get install -y nginx
```

* /etc/nginx/sites-available/default 파일 변경

```
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        return 301 https://$host$request_uri;
}

server {
        listen 443 ssl;

				# Location of key
        ssl_certificate /etc/letsencrypt/live/{도메인 주소}/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/{도메인 주소}/privkey.pem;

        # Disable SSL
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;

        ssl_prefer_server_ciphers on;
        sl_ciphers ECDH+AESGCM:ECDH+AES256:ECDH+AES128:DH+3DES:!ADH:!AECDH:!MD5;

        # Enable HSTS
        add_header Strict-Transport-Security "max-age=31536000" always;

        # SSL sessions
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;
        
        location / {
                proxy_pass http://localhost:8080;
        }
}
```

