-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: e_commerce_shopping
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT '1',
  `userId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `sizeSelected` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `productId` (`productId`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,2,1,1,'S'),(2,2,1,2,'S'),(13,1,1,1,'[S]'),(44,1,21,15,'M');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'SHIRT MEN'),(2,'SHIRT WOMEN'),(3,'SWEATER'),(4,'T SHIRT');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historyorders`
--

DROP TABLE IF EXISTS `historyorders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historyorders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `totalPrice` decimal(10,2) NOT NULL,
  `orderStatus` enum('Đang chờ xử lý','Đã giao hàng','Hoàn thành') DEFAULT 'Đang chờ xử lý',
  `shippingAddress` text NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `receiverName` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `paymentMethod` enum('COD','BANK_TRANSFER') NOT NULL DEFAULT 'COD',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `historyorders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historyorders`
--

LOCK TABLES `historyorders` WRITE;
/*!40000 ALTER TABLE `historyorders` DISABLE KEYS */;
INSERT INTO `historyorders` VALUES (1,1,3500000.00,'Đã giao hàng','Khánh Hòa','2026-01-29 19:13:42','2026-01-30 19:44:20','Tran Thanh Hoa','0886176793','thanhhoa@gmail.com','COD'),(2,1,3500000.00,'Đang chờ xử lý','Khánh Hòa','2026-01-29 19:14:48','2026-01-29 19:14:48','Tran Thanh Hoa','0886176793','thanhhoa@gmail.com','COD'),(3,2,3500000.00,'Đang chờ xử lý','aa','2026-01-30 08:37:13','2026-01-30 08:37:13','Nguyen Nhat Bang','0886176793','truc.2703@gmail.com','COD'),(4,2,3500000.00,'Đang chờ xử lý','aaaa','2026-01-30 08:40:15','2026-01-30 08:40:15','Nguyen Nhat Bangaaaaa','0886176793','aaaa.@gmail.com','COD'),(5,2,1400000.00,'Đang chờ xử lý','aa','2026-01-30 09:02:35','2026-01-30 09:02:35','nnn','0886176793','thanhhoa11102003@gmail.com','COD'),(6,2,2800000.00,'Đang chờ xử lý','11','2026-01-30 09:06:54','2026-01-30 09:06:54','qq','0886176793','truc.2703@gmail.com','COD'),(7,2,4200000.00,'Đang chờ xử lý','aa','2026-01-30 09:09:29','2026-01-30 09:09:29','Nguyen Nhat Bang','0886176793','truc.2703@gmail.com','COD'),(8,2,4200000.00,'Đang chờ xử lý','aa','2026-01-30 16:11:48','2026-01-30 16:11:48','Nguyen','0886176793','truc.2703@gmail.com','COD'),(9,2,4200000.00,'Đang chờ xử lý','aa','2026-02-01 22:29:05','2026-02-01 22:29:05','Nguyen Nhat Bang','0886176793','truc.2703@gmail.com','COD'),(10,2,4200000.00,'Đang chờ xử lý','aa','2026-02-01 22:29:11','2026-02-01 22:29:11','Nguyen Nhat Bang','0886176793','truc.2703@gmail.com','COD'),(11,2,4200000.00,'Đang chờ xử lý','aa','2026-02-01 22:29:24','2026-02-01 22:29:24','Nguyen Nhat Bang','0886176793','truc.2703@gmail.com','COD'),(12,2,4200000.00,'Đang chờ xử lý','aa','2026-02-01 22:30:19','2026-02-01 22:30:19','Nguyen Nhat Bang','0886176793','truc.2703@gmail.com','COD'),(13,2,4200000.00,'Đang chờ xử lý','aa','2026-02-01 22:32:18','2026-02-01 22:32:18','Nguyen Nhat Bang','0886176793','truc.2703@gmail.com','COD'),(14,2,4200000.00,'Đang chờ xử lý','aa','2026-02-04 20:06:24','2026-02-04 20:06:24','Nguyen Nhat Bang','0886176793','truc.2703@gmail.com','COD'),(15,2,2100000.00,'Đang chờ xử lý','aa','2026-02-04 23:39:14','2026-02-04 23:39:14','Nguyen Nhat Bang','0886176793','truc.2703@gmail.com','COD'),(16,2,700000.00,'Đang chờ xử lý','nnnn','2026-02-05 00:37:04','2026-02-05 00:37:04','Nguyen Nhat Bang','0886176793','truc.2703@gmail.com','COD'),(17,2,700000.00,'Đang chờ xử lý','1111','2026-02-05 00:45:20','2026-02-05 00:45:20','Nguyen','0886176793','truc.2703@gmail.com','COD'),(18,2,700000.00,'Đang chờ xử lý','aa','2026-02-05 00:51:15','2026-02-05 00:51:15','Nguyen Nhat a','0886176793','truc.2703@gmail.com','COD'),(19,2,2800000.00,'Đang chờ xử lý','lll','2026-02-05 00:51:34','2026-02-05 00:51:34','vy','0886176793','nnb24.112003@gmail.com','COD'),(20,2,700000.00,'Đang chờ xử lý','11','2026-02-05 00:56:51','2026-02-05 00:56:51','Nguyen Nhat a','0886176793','truc.2703@gmail.com','COD'),(21,2,2800000.00,'Đang chờ xử lý','11','2026-02-05 00:57:24','2026-02-05 00:57:24','nnn','0886176793','aaaa.@gmail.com','COD'),(22,2,700000.00,'Đang chờ xử lý','aa','2026-02-05 21:15:05','2026-02-05 21:15:05','Nguyen Nhat Bang','0886176793','truc.2703@gmail.com','COD'),(23,2,700000.00,'Đang chờ xử lý','nnnn','2026-02-05 21:50:56','2026-02-05 21:50:56','Nguyen Nhat Bang','0886176793','thanhhoa11102003@gmail.com','COD'),(24,2,700000.00,'Đang chờ xử lý','aa','2026-02-09 16:16:51','2026-02-09 16:16:51','Nguyen Nhat Bang','0886176793','nhatbang24.08112003@gmail.com','COD'),(25,2,700000.00,'Đang chờ xử lý','aa','2026-02-10 19:39:15','2026-02-10 19:39:15','Nguyen Nhat Bang','0886176793','nhatbang24.08112003@gmail.com','COD'),(26,21,400000.00,'Đang chờ xử lý','aa','2026-03-09 10:54:22','2026-03-09 10:54:22','Nguyen Nhat Bang','0886176793','nhatbang24.08112003@gmail.com','COD'),(27,21,700000.00,'Đang chờ xử lý','aa','2026-03-09 12:29:23','2026-03-09 12:29:23','Nguyen Nhat Bang','0886176793','nhatbang24.08112003@gmail.com','COD'),(28,21,780000.00,'Đang chờ xử lý','aa','2026-03-13 01:38:09','2026-03-13 01:38:09','Nguyen Nhat Bang','0886176793','nhatbang24.08112003@gmail.com','COD');
/*!40000 ALTER TABLE `historyorders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitems`
--

DROP TABLE IF EXISTS `orderitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderitems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `priceAtPurchase` decimal(10,2) NOT NULL,
  `sizeSelected` varchar(10) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`productId`),
  CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `historyorders` (`id`),
  CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitems`
--

LOCK TABLES `orderitems` WRITE;
/*!40000 ALTER TABLE `orderitems` DISABLE KEYS */;
INSERT INTO `orderitems` VALUES (1,3,3,2,700000.00,'S',NULL,NULL),(2,3,7,3,700000.00,'S',NULL,NULL),(3,4,7,3,700000.00,'S',NULL,NULL),(4,4,3,2,700000.00,'S',NULL,NULL),(5,5,6,1,700000.00,'S',NULL,NULL),(6,5,7,1,700000.00,'XL',NULL,NULL),(7,6,6,2,700000.00,'S','2026-01-30 09:06:54','2026-01-30 09:06:54'),(8,6,7,2,700000.00,'XL','2026-01-30 09:06:54','2026-01-30 09:06:54'),(9,7,6,3,700000.00,'S','2026-01-30 09:09:29','2026-01-30 09:09:29'),(10,7,7,3,700000.00,'XL','2026-01-30 09:09:29','2026-01-30 09:09:29'),(11,8,6,3,700000.00,'S','2026-01-30 16:11:48','2026-01-30 16:11:48'),(12,8,7,3,700000.00,'XL','2026-01-30 16:11:48','2026-01-30 16:11:48'),(13,9,6,3,700000.00,'S','2026-02-01 22:29:05','2026-02-01 22:29:05'),(14,9,7,3,700000.00,'XL','2026-02-01 22:29:05','2026-02-01 22:29:05'),(15,10,6,3,700000.00,'S','2026-02-01 22:29:11','2026-02-01 22:29:11'),(16,10,7,3,700000.00,'XL','2026-02-01 22:29:11','2026-02-01 22:29:11'),(17,11,6,3,700000.00,'S','2026-02-01 22:29:24','2026-02-01 22:29:24'),(18,11,7,3,700000.00,'XL','2026-02-01 22:29:24','2026-02-01 22:29:24'),(19,12,6,3,700000.00,'S','2026-02-01 22:30:19','2026-02-01 22:30:19'),(20,12,7,3,700000.00,'XL','2026-02-01 22:30:19','2026-02-01 22:30:19'),(21,13,6,3,700000.00,'S','2026-02-01 22:32:18','2026-02-01 22:32:18'),(22,13,7,3,700000.00,'XL','2026-02-01 22:32:18','2026-02-01 22:32:18'),(23,14,2,3,700000.00,'S','2026-02-04 20:06:24','2026-02-04 20:06:24'),(24,14,4,1,700000.00,'L','2026-02-04 20:06:24','2026-02-04 20:06:24'),(25,14,4,2,700000.00,'S','2026-02-04 20:06:24','2026-02-04 20:06:24'),(26,15,2,3,700000.00,'S','2026-02-04 23:39:14','2026-02-04 23:39:14'),(27,16,2,1,700000.00,'S','2026-02-05 00:37:04','2026-02-05 00:37:04'),(28,17,3,1,700000.00,'S','2026-02-05 00:45:20','2026-02-05 00:45:20'),(29,18,3,1,700000.00,'S','2026-02-05 00:51:15','2026-02-05 00:51:15'),(30,19,2,4,700000.00,'M','2026-02-05 00:51:34','2026-02-05 00:51:34'),(31,20,2,1,700000.00,'S','2026-02-05 00:56:51','2026-02-05 00:56:51'),(32,21,2,1,700000.00,'S','2026-02-05 00:57:24','2026-02-05 00:57:24'),(33,21,1,3,700000.00,'L','2026-02-05 00:57:24','2026-02-05 00:57:24'),(34,22,2,1,700000.00,'S','2026-02-05 21:15:05','2026-02-05 21:15:05'),(35,23,3,1,700000.00,'S','2026-02-05 21:50:57','2026-02-05 21:50:57'),(36,24,2,1,500000.00,'S','2026-02-09 16:16:51','2026-02-09 16:16:51'),(37,25,2,1,500000.00,'S','2026-02-10 19:39:15','2026-02-10 19:39:15'),(38,26,16,1,400000.00,'S','2026-03-09 10:54:22','2026-03-09 10:54:22'),(39,27,19,1,400000.00,'S','2026-03-09 12:29:24','2026-03-09 12:29:24'),(40,28,17,2,500000.00,'M','2026-03-13 01:38:09','2026-03-13 01:38:09'),(41,28,16,1,400000.00,'M','2026-03-13 01:38:09','2026-03-13 01:38:09'),(42,28,1,1,500000.00,'S','2026-03-13 01:38:09','2026-03-13 01:38:09'),(43,28,15,1,280000.00,'M','2026-03-13 01:38:09','2026-03-13 01:38:09'),(44,28,16,1,400000.00,'S','2026-03-13 01:38:09','2026-03-13 01:38:09');
/*!40000 ALTER TABLE `orderitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productimages`
--

DROP TABLE IF EXISTS `productimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productimages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imageUrl` varchar(255) DEFAULT NULL,
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `productimages_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productimages`
--

LOCK TABLES `productimages` WRITE;
/*!40000 ALTER TABLE `productimages` DISABLE KEYS */;
INSERT INTO `productimages` VALUES (1,'image-shirt_men1-1770622737264-883690121.jpeg',1),(2,'image-shirt_men2-1770622829282-781848054.jpeg',2),(3,'image-shirt_men3-1770622879382-982924180.jpeg',3),(4,'image-shirt_men4-1770622897077-335940009.jpeg',4),(5,'image-shirt_woman1-1770622914325-373421697.jpeg',5),(6,'image-shirt_woman2-1770622927613-684317488.jpeg',6),(7,'image-shirt_woman3-1770622940521-112919225.jpeg',7),(8,'image-shirt_woman4-1770622964706-359980239.jpeg',8),(9,'image-sweater1-1770622976686-980461297.jpeg',9),(10,'image-sweater2-1770622988525-566456212.jpeg',10),(11,'image-sweater3-1770623002026-112813688.jpeg',11),(12,'image-sweater4-1770623015506-757548987.jpeg',12),(13,'image-t_shirt1-1770623033128-452893131.jpeg',13),(14,'image-t_shirt2-1770625552990-563731356.jpeg',14),(15,'image-t_shirt3-1770625596994-818380803.jpeg',15),(16,'image-t_shirt4-1770625614174-702821753.jpeg',16),(17,'image-t_shirt5-1770625633357-523517887.jpeg',17),(18,'image-t_shirt6-1770625646582-465373809.jpeg',18),(19,'image-t_shirt7-1770625663304-532070005.jpeg',19),(20,'image-t_shirt8-1770625676028-118047348.jpeg',20),(21,'image-shirt_men2-1773332612398-917659599.jpeg',1),(22,'image-shirt_men3-1773332813256-623860257.jpeg',1),(23,'image-shirt_men3-1773333016916-361833578.jpeg',2),(24,'image-shirt_men1-1773333028400-907090898.jpeg',2),(25,'image-shirt_men4-1773333037879-990375610.jpeg',2),(26,'image-shirt_men1-1773333072952-652931122.jpeg',3),(27,'image-shirt_men2-1773333079926-927143147.jpeg',3),(28,'image-shirt_men1-1773333090603-885045026.jpeg',4),(29,'image-shirt_men2-1773333098419-928458902.jpeg',4),(30,'image-shirt_woman2-1773333114153-885765809.jpeg',5),(31,'image-shirt_woman3-1773333190548-386492261.jpeg',6),(32,'image-shirt_woman2-1773333199345-418284400.jpeg',7),(33,'image-shirt_woman1-1773333209856-222120817.jpeg',8),(34,'image-sweater2-1773333237877-208501545.jpeg',9),(35,'image-sweater4-1773333249717-837266217.jpeg',9),(36,'image-sweater4-1773333262673-495652761.jpeg',10),(37,'image-sweater3-1773333271623-534652097.jpeg',10),(38,'image-sweater1-1773333279311-631117270.jpeg',11),(39,'image-sweater1-1773333288438-737533056.jpeg',12),(40,'image-sweater2-1773333295692-570390358.jpeg',12),(41,'image-t_shirt2-1773333313043-620349220.jpeg',13),(42,'image-t_shirt6-1773333320528-470816415.jpeg',13),(43,'image-t_shirt7-1773333333633-17773259.jpeg',14),(44,'image-t_shirt1-1773333359068-400317648.jpeg',15),(45,'image-t_shirt2-1773333367074-229688895.jpeg',15),(46,'image-t_shirt8-1773334101971-75031519.jpeg',15),(47,'image-t_shirt8-1773334153978-493597665.jpeg',16),(48,'image-t_shirt7-1773334161235-102926561.jpeg',16),(49,'image-t_shirt7-1773334170200-315518262.jpeg',17),(50,'image-sweater1-1773334178190-738067809.jpeg',17),(51,'image-t_shirt2-1773334188171-745619717.jpeg',18),(52,'image-t_shirt4-1773334194775-420373918.jpeg',18),(53,'image-t_shirt2-1773334203351-411352541.jpeg',19),(54,'image-t_shirt1-1773334213625-165364761.jpeg',20),(55,'image-t_shirt2-1773334221038-422842618.jpeg',20),(56,'image-sweater3-1773334226703-75736092.jpeg',20),(57,'image-shirt_men4-1773337546811-666995122.jpeg',1);
/*!40000 ALTER TABLE `productimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `priceSale` decimal(10,2) DEFAULT NULL,
  `description` text,
  `sizes` json DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'SHIRT MEN 1',700000.00,500000.00,'Ao so mi tay dai mau xam','[\"S\", \"M\", \"L\", \"XL\"]','[\"noi bat\", \"sale 30%\", \"sale\"]',1),(2,'SHIRT MEN 2',700000.00,500000.00,'Ao so mi tay dai mau xanh','[\"S\", \"M\", \"L\", \"XL\"]','[\"noi bat\", \"sale 30%\", \"sale\"]',1),(3,'SHIRT MEN 3',700000.00,0.00,'Ao thun soc xanh trang','[\"S\", \"M\", \"L\", \"XL\"]','[\"noi bat\"]',1),(4,'SHIRT MEN 4',700000.00,0.00,'Ao thun trang va so mi xanh','[\"S\", \"M\", \"L\", \"XL\"]','[\"noi bat\"]',1),(5,'SHIRT WOMEN 1',300000.00,0.00,'Do ngu mau hong','[\"S\", \"M\", \"L\", \"XL\"]','[]',2),(6,'SHIRT WOMEN 2',700000.00,0.00,'Ao len nu mau hong','[\"S\", \"M\", \"L\", \"XL\"]','[]',2),(7,'SHIRT WOMEN 3',700000.00,0.00,'Ao len nu mau be','[\"S\", \"M\", \"L\", \"XL\"]','[\"noi bat\"]',2),(8,'SHIRT WOMEN 4',300000.00,0.00,'Do ngu mau den','[\"S\", \"M\", \"L\", \"XL\"]','[\"noi bat\"]',2),(9,'SWEATER 1',700000.00,400000.00,'Ao Weater 3 mau','[\"S\", \"M\", \"L\", \"XL\"]','[\"noi bat\", \"sale 40%\", \"sale\"]',3),(10,'SWEATER 2',700000.00,400000.00,'Ao Weater mau den','[\"S\", \"M\", \"L\", \"XL\"]','[\"sale 40%\", \"sale\"]',3),(11,'SWEATER 3',700000.00,400000.00,'Ao Weater mau do','[\"S\", \"M\", \"L\", \"XL\"]','[\"sale 40%\", \"sale\"]',3),(12,'SWEATER 4',700000.00,400000.00,'Ao Weater mau be','[\"S\", \"M\", \"L\", \"XL\"]','[\"sale 40%\", \"sale\"]',3),(13,'T SHIRT 1',400000.00,280000.00,'ao thun den','[\"S\", \"M\", \"L\", \"XL\"]','[\"noi bat\", \"sale 30%\", \"sale\"]',4),(14,'T SHIRT 2',700000.00,400000.00,'ao thun mau hong ','[\"S\", \"M\", \"L\", \"XL\"]','[\"noi bat\", \"sale 30%\", \"sale\"]',4),(15,'T SHIRT 3',400000.00,280000.00,'ao thun den tay ngan','[\"S\", \"M\", \"L\", \"XL\"]','[\"noi bat\", \"sale 30%\", \"sale\"]',4),(16,'T SHIRT 4',400000.00,0.00,'ao thun den tay ngan','[\"S\", \"M\", \"L\", \"XL\"]','[\"noi bat\"]',4),(17,'T SHIRT 5',500000.00,0.00,'ao thun den tay ngan','[\"S\", \"M\", \"L\", \"XL\"]','[\"noi bat\"]',4),(18,'T SHIRT 6',700000.00,400000.00,'ao thun mau be','[\"S\", \"M\", \"L\", \"XL\"]','[\"sale 40%\", \"sale\"]',4),(19,'T SHIRT 7',700000.00,400000.00,'ao thun mau hong','[\"S\", \"M\", \"L\", \"XL\"]','[\"sale 40%\", \"sale\"]',4),(20,'T SHIRT 8',700000.00,400000.00,'ao thun mau xanh duong','[\"S\", \"M\", \"L\", \"XL\"]','[\"sale 40%\", \"sale\"]',4);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` text,
  `phone` varchar(15) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Nguyen Nhat Bang','nnb24.112003@gmail.com','$2b$10$foy/a/6zPIlp3fmLGnnrxeSjvv6HXQnO7DY0wQUZz6N0cVwMyDjS2','Khanh Hoa','0886667666','admin','2026-01-19 11:23:02','2026-03-08 23:47:15'),(2,'Tran Thanh Hoa','thanhhoa11102003@gmail.com','$2b$10$N3wWFGZPto/WLMFG0Z2xN.vFLCJUZF4ua1adocSKheVYYBVzAVnRS','Khanh Hoa','0886176793','user','2026-01-26 13:34:02','2026-01-26 13:34:02'),(3,'Nguyen Van a','nhatbang11.2003@gmail.com','$2b$10$AtVodWfdbTZludIzROrBOu4u2cpuuo41Y6n90LrZeY/698lBst/5a','Khanh Hoa','0886176793','user','2026-01-27 12:54:26','2026-01-27 12:54:26'),(4,'Tran Than Hoa','thanhgoa11102003@gmail.com','$2b$10$z8A0wPgMcAq.8Sz2mkikDO448iqSw6IFVdz0G01oSf0rqYhwUifaS','Khanh Hoa','0886176793','user','2026-01-29 15:24:59','2026-01-29 15:24:59'),(21,'Admin','admin@gmail.com','$2b$10$K4LTTfYqkVzWFm7CJICx9uHOKYT1t.6/seWdOYhsVLFJBQHD7KT9O',NULL,NULL,'admin','2026-03-08 23:41:40','2026-03-08 23:41:40');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-20 14:39:45
