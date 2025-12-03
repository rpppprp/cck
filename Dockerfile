# --------------------
# 1. 빌드 단계 (Build Stage): JAR 파일 생성
# --------------------
# Maven과 JDK가 설치된 환경을 베이스 이미지로 사용
FROM maven:3.9.5-eclipse-temurin-21 AS build

# 작업 디렉토리를 /app으로 설정
WORKDIR /app

# Maven 설정 파일(pom.xml) 복사 및 의존성 먼저 다운로드
COPY pom.xml .
RUN mvn dependency:go-offline

# 소스 코드 복사
COPY src ./src

# Spring Boot 애플리케이션 빌드 (target 폴더에 JAR 파일 생성)
# -DskipTests는 테스트를 건너뛰어 빌드 속도를 높입니다.
RUN mvn package -DskipTests


# --------------------
# 2. 실행 단계 (Run Stage): 애플리케이션 실행
# --------------------
# JRE(Java Runtime Environment)만 포함된 훨씬 가벼운 이미지를 사용 (보안/효율성)
FROM eclipse-temurin:21-jre-jammy

# 빌드 단계에서 생성된 JAR 파일을 복사합니다.
# 주의: {your-artifact-name}을 pom.xml에 정의된 실제 빌드 결과 파일명으로 변경해야 합니다.
# 보통은 target 폴더의 *.jar 파일 중 하나가 됩니다.
COPY --from=build /app/target/*.jar app.jar

# Spring Boot 애플리케이션 실행 명령어 정의
ENTRYPOINT ["java", "-jar", "app.jar"]