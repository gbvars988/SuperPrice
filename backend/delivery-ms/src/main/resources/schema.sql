DROP TABLE IF EXISTS Order;
DROP TABLE IF EXISTS OrderItem;
DROP TABLE IF EXISTS Delivery;
DROP TABLE IF EXISTS TimeSlot;


CREATE TABLE IF NOT EXISTS Order (
    OrderID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT, -- This references the UserID from user-ms but without FK constraints due to microservices architecture
    DateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(255) DEFAULT 'Pending'
    );

CREATE TABLE IF NOT EXISTS OrderItem (
    OrderItemID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    ProductID INT, -- This references product from product-ms. No FK constraints because of microservices
    Quantity INT NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Order(OrderID)
    );

CREATE TABLE IF NOT EXISTS Delivery (
    DeliveryID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    Address TEXT NOT NULL,
    Email VARCHAR(255) NOT NULL,
    TimeSlot VARCHAR(255),
    DeliveryStatus VARCHAR(255) DEFAULT 'Scheduled',
    FOREIGN KEY (OrderID) REFERENCES Order(OrderID)
    );

CREATE TABLE IF NOT EXISTS TimeSlot (
    TimeSlotID INT PRIMARY KEY AUTO_INCREMENT,
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL
);