# next.js + EC2 배포하기

## next.js로 프로젝트 만들기

### 1. 프로젝트 생성

```shell
npx create-next-app projectName
```

- 프로젝트 root 파일 : pages/index.js
- `yarn start` 전에 `yarn build` 실행하기

## 배포 가이드

### 1. EC2 인스턴스 생성하기

- **인스턴스 시작** 버튼 선택
- 1단계. Ubuntu Server 20.04 LTS (HVM), SSD Volume Type 선택
- 2단계. 인스턴스 유형 - t2.micro
- 3단계. 인스턴스 세부 정보 구성
  - 네트워크, 서브넷 설정
  - 퍼블릭 IP 자동 할당 - 활성화
- 4단계. 스토리지 추가 - 기본값 사용
- 5단계. 태그 추가
  - 태그 추가 선택 후 원하는 값으로 설정(나의 인스턴스를 쉽게 찾기 위함)
- 6단계. 보안 그룹 구성
  - 테크코스 기본 보안 그룹 선택
- **검토 및 시작** 버튼 선택
- 확인 후 **시작하기** 버튼 선택
- 키 페어 발급
  - 새 키 페어 생성
- **인스턴스 시작** 버튼 선택

### 2. SSH 접속

- 인스턴스 **연결** 버튼 선택
- **SSH 클라이언트** 탭 선택
  - 로컬 터미널에서 연결 명령어 실행
  ```shell
  ssh -i "key.pem" ubuntu@ec2-3-34-5-224.ap-northeast-2.compute.amazonaws.com
  ```
  - 첫 접속 시 자격증명 확인
  ```shell
  ECDSA key fingerprint is SHA256:KbmyzF202YfuuCXWjOZ6GT8YegHQwSrjApFKf0HzLrc.
  Are you sure you want to continue connecting (yes/no/[fingerprint])?
  > yes
  ```

### 3. 프로젝트 셋팅

- 원하는 프로젝트 GitHub에서 clone
- 프로젝트 폴더로 이동
- node 설치
  - 다음 명령어들을 순서대로 실행
  ```shell
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
  . ~/.nvm/nvm.sh
  nvm install node
  ```
- node 설치 확인
  - 버전이 잘 나온다면 설치 성공
  ```shell
  node -v
  ```
- yarn 설치
  ```shell
  curl -o- -L https://yarnpkg.com/install.sh | bash
  ```
- 프로젝트 의존성 설치, 빌드, 시작
  ```shell
  yarn
  yarn build
  yarn start
  ```

### 4. 포트 리다이렉트

```shell
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
```

- EC2 인스턴스 > 네트워킹 탭 > 퍼블릭 IPv4 DNS 주소로 접속 시 배포된 사이트를 확인 가능

### 5. 터미널 종료 후에도 서버 활성화

```shell
npm install pm2@latest -g
pm2 start --name "next" -w -i max yarn -- start
```
