# SuperPrice - Price Matching and Delivery Web Application

![Main CI status](https://github.com/cosc2299-sept-2023/team-project-group-p8-01/actions/workflows/ci.yml/badge.svg?branch=main)

# RMIT COSC2299 SEPT Major Project

# Group Information

## Group-P8-01

## Members

* Anthony Imani (s3950363)
* Dylan Khan (s3916841)
* Ledy (s3409664)
* Ronald Ho (s3436258)
* Thomas Yao (s3832771)
* Victoria Needs (s3811305)

## Records

* Github repository: https://github.com/cosc2299-sept-2023/team-project-group-p8-01
* Github Project Board : https://github.com/orgs/cosc2299-sept-2023/projects/109
* [Figma design](https://www.figma.com/file/gdtCVGjLBgJYozRHVMdZ43/SuperPrice-Design?type=design&node-id=0-1&mode=design&t=CCWUZsLUoPtW3Bl8-0)

## Code documentation - Release 0.1.0 - date

* feature 1
* feature 2
* feature 3

# Run Instructions

Up to date instructions on how to run your project.

# Initial Setup

## Setup your environment

You will need to have in your system

- Java 17.0 or higher
- Node and npm
- Apache Maven
- IDE or Editor

Other tools will be required to complete the project (e.g., Docker)

## Backend

See the backend/README.md for more details on getting the backend microservices started.

Optional if you do not have MySQL setup on your device:
1. Download and install the MySQL community server for your OS - https://dev.mysql.com/downloads/mysql/
2. Select a password for the root user and remember it during installation
3. Download and install MySQL shell for your OS - https://dev.mysql.com/downloads/shell/

**Mandatory:**
4. Verify your MySQL db is up by running `mysql -u root -p` in a terminal and entering your password, it should open
   a MySQL shell
5. Change the password in `__-ms/src/main/resources/application.properties` to the one you selected in the MySQL installation step (for the microservices you want to run)
6. cd into `__-ms/` and run `mvn clean package` to build the microservice (for M2, start up user-ms and product-ms, others are still WIP)
7. Run `java -jar target/*.jar` to run the microservice where '*' is package name (e.g. product-ms-0.0.1-SNAPSHOT.jar)

## Frontend

- cd into frontend/
- Install dependencies "npm install"
- Run the app with "npm start"

# Contribution conventions

1. Before contributing make sure a ticket exists in the project board for the work you are doing
2. Run `git pull` to ensure you are up-to-date with the latest changes
3. Create a new branch from `main` using the following branch naming conventions: `firstName/FEATURE-short-description`
    - Replace `FEATURE` with any of the commitizen conventional keywords
      e.g. `CHORE`, `DEFECT`, `FEATURE`, `REFACTOR`, `TEST`
4. When you are ready to merge your branch, create a pull request with the following title
   format: `[FEATURE] Short description`
    - Replace `FEATURE` with any of the commitizen conventional keywords
      e.g. `CHORE`, `DEFECT`, `FEATURE`, `REFACTOR`, `TEST`
    - Fill in the pull request template with the relevant information
    - Link the pull request to the ticket in the project board via the description - valid keywords
      include `closes #XX`, `fixes #XX`, `resolves #XX` etc.




