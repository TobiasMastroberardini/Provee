-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('active','completed','abandoned') DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (12,57,'2024-12-14 23:24:48','2024-12-14 23:24:48','active'),(13,58,'2024-12-15 22:13:12','2024-12-15 22:13:12','active'),(14,59,'2024-12-16 01:56:30','2024-12-16 01:56:30','active'),(15,60,'2024-12-17 00:38:31','2024-12-17 00:38:31','active');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price` decimal(10,2) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_id` (`cart_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (19,15,23,10,1300.00,'Azúcar Ledesma Clásica 1kg');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Ropa'),(2,'drogas'),(3,'bebidas'),(4,'Fideos y Arroz'),(5,'Monica'),(6,'Harinas'),(7,'Cuidado Personal'),(8,'Galletitas'),(9,'Limpieza');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `cantidad` int NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (12,12,37,2,30.00),(13,12,38,1,50.00),(14,12,39,3,20.00),(15,12,37,2,30.00),(16,12,38,1,50.00),(17,12,39,3,20.00),(18,13,37,2,30.00),(19,13,38,1,50.00),(20,13,39,3,20.00),(21,14,40,3,1.30);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `estado` enum('pendiente','pagado','enviado','entregado') DEFAULT 'pendiente',
  `fecha_pedido` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_envio` timestamp NULL DEFAULT NULL,
  `direccion_envio` varchar(255) NOT NULL,
  `metodo_pago` enum('tarjeta','paypal','contraentrega') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (12,57,150.00,'pendiente','2024-12-20 21:19:42',NULL,'Calle Ficticia 123','tarjeta'),(13,60,150.00,'pendiente','2024-12-20 21:23:45',NULL,'Calle Ficticia 123','tarjeta'),(14,57,3.90,'pagado','2024-12-20 22:32:03',NULL,'Dirección de ejemplo','tarjeta');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `monto` decimal(10,2) NOT NULL,
  `metodo_pago` enum('tarjeta','paypal','contraentrega') NOT NULL,
  `estado` enum('pendiente','completado','fallido') DEFAULT 'pendiente',
  `fecha_pago` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (11,2,'/uploads/1734017370324-484665709.webp'),(13,20,'/uploads/1734021104975-506749024.webp'),(14,21,'/uploads/1734022968341-214121461.webp'),(15,22,'/uploads/1734023523817-783024327.webp'),(17,24,'/uploads/1734024227405-742637266.webp'),(18,25,'/uploads/1734028128623-770960319.webp'),(19,26,'/uploads/1734028182273-955045767.webp'),(20,27,'/uploads/1734048194450-73403018.webp'),(21,30,'/uploads/1734049097008-776029483.webp'),(22,28,'/uploads/1734049125667-957017318.webp'),(23,31,'/uploads/1734049384956-217202666.webp'),(30,23,'/uploads/1734054702650-879881096.webp'),(31,33,'/uploads/1734118056981-254141234.webp'),(32,37,'/uploads/1734363896989-964249392.webp'),(33,38,'/uploads/1734364342396-233854100.webp'),(34,39,'/uploads/1734443201652-118256475.webp'),(35,40,'/uploads/1734709232016-435461318.webp');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL,
  `cantidad_disponible` int NOT NULL,
  `categoria_id` int DEFAULT NULL,
  `estado` enum('disponible','no_disponible') DEFAULT 'disponible',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `on_sale` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoria_id` (`categoria_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,'Exquisita Brownie Chocolate 750gr','',1500.00,30,6,'disponible','2024-11-12 00:04:26',0),(20,'Harina De Trigo ultra refinada 0000 Pureza 1 Kg','',1130.00,1,6,'disponible','2024-12-12 16:31:44',0),(21,'Harina 000 Cañuelas de trigo 1kg','',910.00,1,6,'disponible','2024-12-12 17:02:48',0),(22,'Dulce De Leche Clásico Tregar X 400g','',1900.00,1,1,'disponible','2024-12-12 17:12:03',0),(23,'Azúcar Ledesma Clásica 1kg','',1300.00,1,1,'disponible','2024-12-12 17:21:28',0),(24,'Rollos De Cocina Sussex Clásico 3 X 50 Paños','',1150.00,1,1,'disponible','2024-12-12 17:23:47',1),(25,'Pack x6 cervezas Lata 0.0% Rubia 2838 mL Quilmes','',6435.00,1,1,'disponible','2024-12-12 18:28:48',1),(26,'Yerba mate Playadito suave 1000g','',3939.00,1,1,'disponible','2024-12-12 18:29:42',1),(27,'Dermaglós Solar FPS 50 protector solar en emulsión de 250 mL','',16017.00,1,7,'disponible','2024-12-13 00:03:14',1),(28,'Alfajor Guaymallen Chocolate Negro 38g Caja x 40Un','',8700.00,1,1,'disponible','2024-12-13 00:11:32',0),(30,'Raid Liquido Eléctrico 45 Noches Aparato + Repuesto','',7799.00,1,2,'disponible','2024-12-13 00:18:17',0),(31,'Cartuchos De Afeitar Gillette Fusion5 Proshield 4 Un','',31125.00,1,7,'disponible','2024-12-13 00:23:06',0),(33,'Galletitas De Agua Sandwich La Providencia Pack Familiar X5','',1852.00,1,8,'disponible','2024-12-13 19:27:36',0),(37,'Fideos Spaghetti Integral Matarazzo X500 Gr','',1600.00,1,4,'disponible','2024-12-16 14:51:18',0),(38,'Galletita Don Satur Bizcochos dulce 200 g','',780.00,2,8,'disponible','2024-12-16 15:51:32',0),(39,'producto para prueba','',1.00,1,1,'disponible','2024-12-17 13:46:41',0),(40,'MASTROBERARDINi','as',1.30,1,2,'disponible','2024-12-20 15:40:32',0);
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
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(600) DEFAULT NULL,
  `rol` enum('admin','cliente') DEFAULT 'cliente',
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (57,'Tobias Mastroberardini','tmastroberardini1@gmail.com','$2a$10$UIOwTnxmd..iME4alerDBOE2jC86qriN7HBID91mnGM.4/iNOv7WG','cliente','Canada 1248','2494552058','2024-12-14 23:24:48'),(58,'tobias','t@gmail.com','$2a$10$IfqJ6i50nrcTEyaXlNTPH.y6XWMUAcLKFwZlTcMkUZYPtP613C45q','cliente','canada','2494552058','2024-12-15 22:13:12'),(59,'Juan Garcia','provee@gmail.com','$2a$10$52UcgmhP6D2UyTCQf5UCaOQS9GtPldNx/1ySDuj2TquwvVu/F5av.','admin','Rodriguez y Las Heras','2494550693','2024-12-16 01:56:30'),(60,'Proove admin','admin@gmail.com','$2a$10$8Rd9efZV8lzYJJMv8plAoeSHGRHF5ow8Lw0oro2IhvYxTkSVoD0Ri','admin','2','2','2024-12-17 00:38:31');
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

-- Dump completed on 2024-12-21 22:07:51
