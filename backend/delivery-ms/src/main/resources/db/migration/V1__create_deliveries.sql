DROP TABLE IF EXISTS deliveries;
CREATE TABLE deliveries(
                        orderId INT PRIMARY KEY AUTO_INCREMENT,
                        address VARCHAR(255) not null,
                        items VARCHAR(255) not null,
                        timeSlot VARCHAR(255) not null,
                        userId INT NOT NULL
);