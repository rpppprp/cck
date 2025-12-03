# --------------------
# 1. 빌드 단계 (Build Stage)
# --------------------
# Java 17 빌드 환경으로 변경
FROM maven:3.9.5-eclipse-temurin-17 AS build

# 작업 디렉토리를 /app으로 설정
WORKDIR /app

# Maven 설정 파일 복사 및 의존성 다운로드
COPY pom.xml .
RUN mvn dependency:go-offline

# 소스 코드 복사 (templates 포함)
COPY src ./src

# Spring Boot 애플리케이션 빌드
RUN mvn package -DskipTests

# --------------------
# 2. 실행 단계 (Run Stage)
# --------------------
# Java 17 실행 환경(JRE)으로 변경
FROM eclipse-temurin:17-jre-jammy

# JAR 파일 복사
COPY --from=build /app/target/*.jar app.jar

# Spring Boot 애플리케이션 실행 명령어 정의
ENTRYPOINT ["java", "-jar", "app.jar"]