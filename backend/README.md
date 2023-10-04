This is SuperPrice's backend built on spring-boot web.

### Initial setup steps

1. Download and install the MySQL community server for your OS - https://dev.mysql.com/downloads/mysql/
2. Select a password for the root user and remember it during installation
3. Change the password in `__-ms/src/main/resources/application.properties` to the one you selected
4. Download and install MySQL shell for your OS - https://dev.mysql.com/downloads/shell/
5. Verify your MySQL installation by running `mysql -u root -p` in a terminal and entering your password, it should open
   a MySQL shell
6. cd into `__-ms/` and run `mvn clean package` to build the microservice
7. Run `java -jar target/*.jar` to run the microservice where '*' is package name (e.g. product-ms-0.0.1-SNAPSHOT.jar)

### Automated scripts

Script to run product service provided in ../backend/start-productms.sh
Run script in shell to start product-ms.

### 'mvn clean package'

Builds the microservice and creates a jar package in 'target'.

### 'java -jar *.jar'

Runs microservice where '*' is package name (e.g. product-ms-0.0.1-SNAPSHOT.jar).

### Ports

* product-ms 8080
* user-ms 8081
* delivery-ms 8082
* notifications-ms 8083

