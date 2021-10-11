<p align="middle" >
  <img width="150px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"/>
</p>
<h2 align="middle">OO 배포 가이드북</h2>
<p align="middle">서비스 성격에 따른 배포 전략</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

# 도비의 deploy book

## 1. 나의 배포 경험

- 대학교 졸업 [프로젝트](https://github.com/zereight/DeepTube3) (GCP EC2 사용)
- 우아한테크코스 [프로젝트](https://github.com/woowacourse-teams/2021-darass) (AWS S3+CloudFront 사용)

## 2. AWS에서 SSR, CSR에 따른 배포 전략

- CSR이 CDN배포가 권장되는 이유

  - CSR은 AJAX와 관련된 로직의 대부분이 몇개의 번들 파일에 포함되기 때문에 상대적으로 용량이 크다.
    그러므로, 클라이언트에서 정적 리소스를 좀더 빠르게 다운로드 받을 수 있도록 CDN을 통해서 캐싱해놓는 것이 좋다.

- EC2 배포가 가지는 특징

  - EC2는 내가 원하는 스펙의 가상의 하드웨어로 컴퓨터를 구동시킨다고 생각하면된다.
    내가 원하는 CPU, GPU, RAM, SSD 등을 고를 수 있다. (물론 비용은 별도)

  - 하나의 컴퓨터와 통신을 하는것과 같기 때문에, 네트워크 및 방화벽등의 설정할 수 있는 세팅을 자유롭고 상세하게 할 수 있다.

## 3. 마크업한 결과물을 배포하고 그 과정 기록하기

- 애플웹사이트 S3+Cloudfront로 [배포하기](https://d2wt7zndun1gn.cloudfront.net/)

1. S3 버킷만들기 (보안그룹등 상세 셋팅)

2. 번들된 정적 파일 올리기
   2-1. cache-control
   <img width="1016" alt="스크린샷 2021-10-04 오후 2 08 20" src="https://user-images.githubusercontent.com/42544600/135910037-ef6ee3a6-021e-4be7-a75d-8e65e3e8349b.png">

3. CloudFront가 S3 버킷을 바라보도록 만들기
   3-1. 에러페이지 예외처리
   3-2. 캐싱전략
   3-3. 네트워크 설정
   <img width="414" alt="스크린샷 2021-10-05 오전 4 05 35" src="https://user-images.githubusercontent.com/42544600/135909449-dacaeb4d-6b8b-4a22-a457-7905f70c61c6.png">
   <img width="414" alt="스크린샷 2021-10-05 오전 4 06 16" src="https://user-images.githubusercontent.com/42544600/135909528-33754c53-0623-4e27-8436-4dfc897aff82.png">
   <img width="414" alt="스크린샷 2021-10-05 오전 4 06 40" src="https://user-images.githubusercontent.com/42544600/135909570-ab3d6dc9-65eb-4c5d-9801-b7115ddec78b.png">
   <img width="414" alt="스크린샷 2021-10-05 오전 4 07 03" src="https://user-images.githubusercontent.com/42544600/135909616-d115c1ea-2476-4e7b-b12d-a41f31fd4a79.png">
   <img width="579" alt="스크린샷 2021-10-05 오전 4 08 41" src="https://user-images.githubusercontent.com/42544600/135909837-326137f3-9a69-41d6-9524-642feae493fe.png">
   <img width="579" alt="스크린샷 2021-10-05 오전 4 09 09" src="https://user-images.githubusercontent.com/42544600/135909903-bda9bc02-b4cb-4fa2-bb66-d78039b4acde.png">

   - 완료
     <img width="579" alt="스크린샷 2021-10-05 오전 4 08 09" src="https://user-images.githubusercontent.com/42544600/135909761-e3b493db-6ad1-4a28-b545-04de94b2f4b2.png">

<hr/>

- nextjs로 항공사 웹사이트 컴포넌트가 있는 유닛 페이지 3개를 만든 후 EC2로 [배포하기](http://13.209.49.133:8080/)

1. nextjs로 프로젝트 만들기
   1-1. 로컬에서 nestjs관련 로직이 잘 동작하는지 검증
   1-2. EC2에서 배포할 port로 미리 바꿔놓기
2. EC2 인스턴스 생성하기
   2-1. 설정 참고 (https://techcourse.woowahan.com/s/SKWnl6ux/ls/twJIJgUQ)
   <img width="675" alt="스크린샷 2021-10-05 오전 4 13 34" src="https://user-images.githubusercontent.com/42544600/135910396-66671f4b-7bb1-4df2-a2b7-f9fb9c4dd980.png">

   2-2. 설정된 VPC와 동일한 아이피에서 SSH 접속하기
   <img width="558" alt="스크린샷 2021-10-05 오전 4 12 31" src="https://user-images.githubusercontent.com/42544600/135910274-135acbc0-98b1-4bd7-8f37-d7d9f13d7f90.png">

3. EC2에서 nextjs 프로젝트 clone하기
   3-1. EC2의 인/아웃바운드에 설정된 포트로 퍼플릭ip에 접속하기
   3-2. https 설정이 안되어있다면 http로 접속하기
   <img width="337" alt="스크린샷 2021-10-05 오전 4 14 32" src="https://user-images.githubusercontent.com/42544600/135910515-3ecb1663-5a03-465a-820a-f473e7ad0644.png">

4. ssh를 끊어도 배포가 유지되도록 pm2설치하여 실행하기
   4-1. nextjs의 start script를 이용
   <img width="406" alt="스크린샷 2021-10-05 오전 4 14 11" src="https://user-images.githubusercontent.com/42544600/135910458-622a7010-876f-4420-8dd1-a3ec75fbe66c.png">
