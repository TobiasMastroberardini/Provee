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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Camiseta de Algodón con caca y pis','Camiseta 100% algodón',19.99,50,2,'disponible','2024-11-12 00:04:26',NULL),(2,'Auriculares','Auriculares bluetooth',49.99,30,2,'disponible','2024-11-12 00:04:26',NULL),(8,'Camiseta de Algodón','Camiseta 100% algodón',19.99,50,1,'disponible','2024-11-26 14:23:15',NULL),(9,'Camiseta','Camiseta 100% algodón',19.99,50,1,'disponible','2024-12-04 00:11:01',NULL),(11,'aversianda','222',2.00,2,1,'disponible','2024-12-04 00:12:10',NULL),(12,'MASTROBERARDINi','4343',4.00,3,1,'disponible','2024-12-10 23:45:42',NULL),(13,'Producto de Ejemplo','Descripción detallada del producto de ejemplo.',29.99,100,1,'disponible','2024-12-10 23:52:31',NULL),(14,'María Florencia Bertuzzi ','11',1.00,1,1,'disponible','2024-12-10 23:56:52',NULL),(15,'rodrigo castilla','fwfwfw',2900.00,1,2,'disponible','2024-12-11 13:53:28',NULL),(16,'imagen','33',3.00,3,1,'disponible','2024-12-11 14:16:08',1),(17,'Editado','3223',32.00,3,1,'disponible','2024-12-11 14:52:47',1),(18,'qwqww','12',12.00,12,2,'disponible','2024-12-11 19:55:08',NULL),(19,'qwqww','12',12.00,12,2,'disponible','2024-12-11 19:55:19',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-12 11:44:58
