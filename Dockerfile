#FROM timbru31/java-node:25-jdk-krypton
FROM eclipse-temurin:25-jre-alpine

WORKDIR /app

COPY server/app/target/app*.jar app.jar

EXPOSE 8080

CMD [ "java", "-jar", "app.jar" ]
