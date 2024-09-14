# github에서 Repository

```ts
git clone https://github.com/DDD-Community/DDD-11-AppleRoid-BE.git
```
명령어를 통해 로컬에 프로젝트를 복제합니다.

## .env 파일 설정를 추가로 생성.
```
# 서버 포트
SERVER_PORT=3000

# Mysql DB 설정
DB_MYSQL_HOST=localhost
DB_MYSQL_PORT=3306
DB_MYSQL_DATABASE=mkoong
DB_MYSQL_USERNAME=root
DB_MYSQL_PASSWORD=test1234
DB_MYSQL_CHARSET=utf8mb4
DB_MYSQL_TIMEZONE=+00:00

# REDIS 관련 설정
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

JWT_PHONE_SECRET=JWT_PHONE_SECRET
JWT_PHONE_EXPIRED=5m

JWT_ACCESS_SECRET=JWT_ACCESS_SECRET
JWT_REFRESH_SECRET=JWT_REFRESH_SECRET

JWT_ACCESS_EXPIRED=1h
JWT_REFRESH_EXPIRED=3d

```

## Docker 설치 및 실행 (Mac)

1. Docker Desktop 다운로드
   - [Docker 공식 웹사이트](https://www.docker.com/products/docker-desktop)에 접속합니다.
   - "Download for Mac" 버튼을 클릭하여 Docker Desktop 설치 파일을 다운로드합니다.

2. Docker Desktop 설치
   - 다운로드한 `.dmg` 파일을 더블클릭하여 실행합니다.
   - Docker 아이콘을 Applications 폴더로 드래그하여 설치를 완료합니다.

3. Docker Desktop 실행
   - Applications 폴더에서 Docker를 찾아 더블클릭하여 실행합니다.
   - 처음 실행 시 시스템 권한을 요구할 수 있으며, 관리자 비밀번호를 입력하여 권한을 부여합니다.

4. Docker 실행 확인
   - Docker Desktop이 실행되면 상단 메뉴바에 고래 아이콘이 나타납니다.
   - 터미널을 열고 다음 명령어를 입력하여 Docker가 정상적으로 설치되었는지 확인합니다:
     ```
     docker --version
     docker-compose --version
     ```

5. Docker 사용 시작
   - 이제 Docker를 사용하여 컨테이너를 생성하고 관리할 수 있습니다.
   - 예를 들어, 다음 명령어로 간단한 Hello World 컨테이너를 실행할 수 있습니다:
     ```
     docker run hello-world
     ```

이제 Mac에서 Docker를 사용할 준비가 완료되었습니다. Docker Desktop을 통해 컨테이너를 관리하고 개발 환경을 구축할 수 있습니다.

# 도커 컴포즈를 통해 인스턴스 실행

1. 프로젝트 루트 디렉토리로 이동합니다.

2. 다음 명령어를 실행하여 Docker 컨테이너를 빌드하고 실행합니다:
   ```
   docker compose up -d // 를 통해서 백그라운드에서 실행
   ```

3. 컨테이너가 성공적으로 실행되면, 다음과 같은 서비스들이 구동됩니다: ( 도커 앱에서 확인할 수 있음 )
   - MySQL 데이터베이스 (포트: 3306)
   - Redis (포트: 6379)
   - Node.js 애플리케이션 서버 (포트: 3000)

4. 애플리케이션의 스웨거에 접근하려면 웹 브라우저에서 `http://localhost:3000/docs#/`으로 이동합니다.

5. 컨테이너를 중지하고 삭제하려면 다음 명령어를 사용합니다:
   ```
   docker-compose down
   ```

주의: Docker 컨테이너를 실행하기 전에 `.env` 파일이 프로젝트 루트 디렉토리에 있는지 확인하세요. 이 파일에는 데이터베이스 연결 정보와 기타 환경 변수가 포함되어 있습니다.