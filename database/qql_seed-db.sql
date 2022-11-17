# ************************************************************
# Sequel Pro SQL dump
# Version 5446
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 8.0.31)
# Database: qql
# Generation Time: 2022-11-17 16:34:12 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table locations
# ------------------------------------------------------------

CREATE TABLE `locations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `host` varchar(32) DEFAULT NULL,
  `folderPath` varchar(256) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `inx_host_folderpath` (`host`,`folderPath`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;



# Dump of table outputs
# ------------------------------------------------------------

CREATE TABLE `outputs` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `render_id` int unsigned DEFAULT NULL,
  `location_id` int unsigned NOT NULL,
  `filename` varchar(256) NOT NULL DEFAULT '',
  `pixelWidth` int DEFAULT NULL,
  `renderTime` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `render_id` (`render_id`,`pixelWidth`),
  KEY `fk_location` (`location_id`),
  KEY `fk_render` (`render_id`),
  CONSTRAINT `fk_location` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`),
  CONSTRAINT `fk_render` FOREIGN KEY (`render_id`) REFERENCES `renders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;



# Dump of table renders
# ------------------------------------------------------------

CREATE TABLE `renders` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `seed_id` int unsigned NOT NULL,
  `backgroundColor` varchar(255) DEFAULT NULL,
  `numColors` int DEFAULT NULL,
  `numPoints` int DEFAULT NULL,
  `colorList` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_seed_id` (`seed_id`),
  CONSTRAINT `fk_seed` FOREIGN KEY (`seed_id`) REFERENCES `seeds` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;



# Dump of table seeds
# ------------------------------------------------------------

CREATE TABLE `seeds` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `full_hexseed` varchar(255) DEFAULT NULL,
  `wallet_id` int unsigned DEFAULT NULL,
  `algorithm_hexseed` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `full_hexseed` (`full_hexseed`),
  KEY `fk_wallet` (`wallet_id`),
  CONSTRAINT `fk_wallet` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;



# Dump of table traits
# ------------------------------------------------------------

CREATE TABLE `traits` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `seed_id` int unsigned DEFAULT NULL,
  `version` int DEFAULT NULL,
  `flowField` varchar(255) DEFAULT NULL,
  `turbulence` varchar(255) DEFAULT NULL,
  `margin` varchar(255) DEFAULT NULL,
  `colorVariety` varchar(255) DEFAULT NULL,
  `colorMode` varchar(255) DEFAULT NULL,
  `structure` varchar(255) DEFAULT NULL,
  `bullseyeRings1` varchar(255) DEFAULT NULL,
  `bullseyeRings2` varchar(255) DEFAULT NULL,
  `bullseyeRings3` varchar(255) DEFAULT NULL,
  `bullseyeRings7` varchar(255) DEFAULT NULL,
  `ringThickness` varchar(255) DEFAULT NULL,
  `ringSize` varchar(255) DEFAULT NULL,
  `sizeVariety` varchar(255) DEFAULT NULL,
  `colorPalette` varchar(255) DEFAULT NULL,
  `spacing` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_trait_seed` (`seed_id`),
  CONSTRAINT `fk_trait_seed` FOREIGN KEY (`seed_id`) REFERENCES `seeds` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;



# Dump of table wallets
# ------------------------------------------------------------

CREATE TABLE `wallets` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `address` (`address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
