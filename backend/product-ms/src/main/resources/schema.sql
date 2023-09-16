-- Create Product Table
DROP TABLE IF EXISTS SupermarketProduct;
DROP TABLE IF EXISTS Supermarket;
DROP TABLE IF EXISTS Product;
# DROP TABLE IF EXISTS Product;
CREATE TABLE IF NOT EXISTS Product (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Category VARCHAR(255),
    ImageURL VARCHAR(255),
    Weight DOUBLE
    );

# Create Supermarket Table
# DROP TABLE IF EXISTS Supermarket;
CREATE TABLE IF NOT EXISTS Supermarket (
    SupermarketID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL
    );

-- Create SupermarketProduct Table
# DROP TABLE IF EXISTS SupermarketProduct;
CREATE TABLE IF NOT EXISTS SupermarketProduct (
    SupermarketID INT,
    ProductID INT,
    Price DOUBLE NOT NULL,
    PRIMARY KEY (SupermarketID, ProductID),
    FOREIGN KEY (SupermarketID) REFERENCES Supermarket(SupermarketID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
    );