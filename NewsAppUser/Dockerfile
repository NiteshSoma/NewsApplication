FROM openjdk
WORKDIR /usr/src
ENV MYSQL_HOST=localhost
ENV MYSQL_DATABASE=testdb
ENV MYSQL_USER=dbuser1
ENV MYSQL_PASSWORD=pass
COPY ./target/NewsAppUser-0.0.1-SNAPSHOT.jar NewsAppUser-0.0.1-SNAPSHOT.jar
#EXPOSE 8081
ENTRYPOINT ["java","-jar","/usr/src/NewsAppUser-0.0.1-SNAPSHOT.jar"] 