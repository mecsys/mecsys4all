FROM sensedia/openjdk21-base
LABEL maintainer="Isaac Mecchi"
WORKDIR /opt/app
COPY target/*.jar mecsys4all.jar
ENTRYPOINT ["java","-jar","/opt/app/mecsys4all.jar"]