DROP TABLE IF EXISTS product;
CREATE TABLE product(
                       id INT PRIMARY KEY AUTO_INCREMENT,
                       name VARCHAR(255) NOT NULL,
                       description VARCHAR(255) NOT NULL,
                       category VARCHAR(255) NOT NULL,
                       price INT NOT NULL,
                       source VARCHAR(255) NOT NULL,
                       unit VARCHAR(255) NOT NULL,
);