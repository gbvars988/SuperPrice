DROP TABLE IF EXISTS orderitem;
DROP TABLE IF EXISTS delivery;
DROP TABLE IF EXISTS `order`;
DROP TABLE IF EXISTS timeslot;


CREATE TABLE IF NOT EXISTS `order` (
    orderID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT, -- Currently nullable assuming user does not need to be registered to request delivery. Otherwise references the UserID from user-ms but without FK constraints due to microservices architecture
    DateCreated DATETIME DEFAULT CURRENT_TIMESTAMP
--     Status VARCHAR(255) DEFAULT 'Pending'
    );

CREATE TABLE IF NOT EXISTS orderitem (
    orderitemID INT PRIMARY KEY AUTO_INCREMENT,
    orderID INT,
    ProductID INT, -- This references product from product-ms. No FK constraints because of microservices
    Quantity INT NOT NULL,
    FOREIGN KEY (orderID) REFERENCES `order`(orderID)
    );

CREATE TABLE IF NOT EXISTS timeslot (
    timeslotID INT PRIMARY KEY AUTO_INCREMENT,
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL
);

CREATE TABLE IF NOT EXISTS delivery (
    deliveryID INT PRIMARY KEY AUTO_INCREMENT,
    orderID INT,
    Address TEXT NOT NULL,
    Email VARCHAR(255) NOT NULL,
    timeslotID  INT,
    deliveryStatus VARCHAR(255) DEFAULT 'Scheduled',
    FOREIGN KEY (orderID) REFERENCES `order`(orderID),
    FOREIGN KEY (timeslotID) REFERENCES timeslot(timeslotID)
    );

