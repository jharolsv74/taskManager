FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

COPY taskmanager/pom.xml .
COPY taskmanager/mvnw .
COPY taskmanager/.mvn .mvn
COPY taskmanager/src src

RUN chmod +x mvnw && ./mvnw dependency:go-offline
RUN ./mvnw package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/taskmanager-0.0.1-SNAPSHOT.jar"]
