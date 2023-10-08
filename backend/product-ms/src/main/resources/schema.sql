-- Create Product Table
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS supermarketproduct;
DROP TABLE IF EXISTS supermarket;
DROP TABLE IF EXISTS product;

CREATE TABLE IF NOT EXISTS product (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Category VARCHAR(255),
    ImageURL VARCHAR(255),
    Weight DOUBLE
    );

# Create supermarket Table
# DROP TABLE IF EXISTS supermarket;
CREATE TABLE IF NOT EXISTS supermarket (
    SupermarketID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL
    );

-- Create SupermarketProduct Table
# DROP TABLE IF EXISTS supermarketproduct;
CREATE TABLE IF NOT EXISTS supermarketproduct (
    SupermarketID INT,
    ProductID INT,
    Price DOUBLE NOT NULL,
    PRIMARY KEY (SupermarketID, ProductID),
    FOREIGN KEY (SupermarketID) REFERENCES supermarket(SupermarketID),
    FOREIGN KEY (ProductID) REFERENCES product(ProductID)
    );

CREATE TABLE IF NOT EXISTS review (
    ReviewID INT PRIMARY KEY AUTO_INCREMENT,
    ProductID INT,
    Name VARCHAR(255) NOT NULL,
    Rating INT,
    Content TEXT,
    FOREIGN KEY (ProductID) REFERENCES product(ProductID)
    );