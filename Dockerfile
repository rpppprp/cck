# --------------------
# 1. 빌드 단계 (Build Stage) - 의존성 캐싱 최적화
# --------------------
# Java 17 빌드 환경을 사용
FROM maven:3.9.5-eclipse-temurin-17 AS build

# 작업 디렉토리를 /app으로 설정
WORKDIR /app

# 1. 의존성 캐싱을 위한 단계
# pom.xml만 먼저 복사하여 파일 변경 여부를 체크할 수 있도록 합니다.
COPY pom.xml .

# 의존성만 다운로드합니다. pom.xml이 변경되지 않으면 이 Layer를 재사용합니다.
RUN mvn dependency:go-offline

# 2. 나머지 소스 코드 복사 및 빌드
# templates, static 파일을 포함한 전체 src 디렉토리를 복사합니다.
COPY src ./src

# Spring Boot 애플리케이션 최종 빌드 (테스트 생략)
RUN mvn package -DskipTests

# --------------------
# 2. 실행 단계 (Run Stage) - 가볍고 빠른 실행 환경
# --------------------
# JRE(Java Runtime Environment)만 포함된 가벼운 Java 17 환경을 사용
FROM eclipse-temurin:17-jre-jammy

# 빌드 단계에서 생성된 JAR 파일을 복사 (보안 강화 및 이미지 크기 축소)
COPY --from=build /app/target/*.jar app.jar

# Spring Boot 애플리케이션 실행 명령어 정의
ENTRYPOINT ["java", "-jar", "app.jar"]