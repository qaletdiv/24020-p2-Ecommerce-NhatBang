create database e_commerce_shopping ; 
use e_commerce_shopping ; 
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  fullName VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  address TEXT,
  phone VARCHAR(15),
  role ENUM('user','admin') DEFAULT 'user',
  createdAt DATETIME,
  updatedAt DATETIME,
  PRIMARY KEY (id),
  UNIQUE (email)
);

CREATE TABLE categories (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  priceSale DECIMAL(10,2),
  description TEXT,
  sizes JSON,
  tags JSON,
  categoryId INT,
  PRIMARY KEY (id),
  FOREIGN KEY (categoryId) REFERENCES categories(id)
);

CREATE TABLE productImages (
  id INT NOT NULL AUTO_INCREMENT,
  imageUrl VARCHAR(255),
  productId INT,
  PRIMARY KEY (id),
  FOREIGN KEY (productId) REFERENCES products(id)
);

CREATE TABLE carts (
  id INT NOT NULL AUTO_INCREMENT,
  quantity INT DEFAULT 1,
  userId INT,
  productId INT,
  sizeSelected VARCHAR(10),
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (productId) REFERENCES products(id)
);

CREATE TABLE historyOrders (
  id INT NOT NULL AUTO_INCREMENT,
  userId INT,
  totalPrice DECIMAL(10,2) NOT NULL,
  orderStatus ENUM('Đang chờ xử lý','Đã giao hàng','Hoàn thành') DEFAULT 'Đang chờ xử lý',
  shippingAddress TEXT NOT NULL,
  receiverName VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100),
  paymentMethod ENUM('COD','BANK_TRANSFER') DEFAULT 'COD',
  createdAt DATETIME,
  updatedAt DATETIME,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE orderItems (
  id INT NOT NULL AUTO_INCREMENT,
  orderId INT,
  productId INT,
  quantity INT NOT NULL,
  priceAtPurchase DECIMAL(10,2) NOT NULL,
  sizeSelected VARCHAR(10),
  createdAt DATETIME,
  updatedAt DATETIME,
  PRIMARY KEY (id),
  FOREIGN KEY (orderId) REFERENCES historyOrders(id),
  FOREIGN KEY (productId) REFERENCES products(id)
);