-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 30, 2025 at 12:15 PM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lumidocdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
CREATE TABLE IF NOT EXISTS `blog` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `seoTitle` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `seoDescription` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`) VALUES
('23af51d0-55d4-4c2c-bedb-e1715fed59e1', 'Hospital Equipements', '2025-03-30 17:04:18.637', '2025-03-30 17:04:18.637'),
('67b36d55-aee5-42aa-9828-cd5fefaffe71', 'Surgical Equipement', '2025-03-30 17:29:30.067', '2025-03-30 17:29:30.067'),
('dd409e6a-3065-409c-9d9d-fc87f462f4da', 'Electro Medical', '2025-03-30 17:33:59.623', '2025-03-30 17:33:59.623'),
('fe68c9af-449c-40ff-9897-3333de2a6977', 'Lab Equipements', '2025-03-30 17:26:38.099', '2025-03-30 17:26:38.099');

-- --------------------------------------------------------

--
-- Table structure for table `contactmessage`
--

DROP TABLE IF EXISTS `contactmessage`;
CREATE TABLE IF NOT EXISTS `contactmessage` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contactmessage`
--

INSERT INTO `contactmessage` (`id`, `name`, `email`, `phone`, `message`, `created_at`, `updated_at`) VALUES
('66548e9d-7804-4e83-aafc-3a37d475a45e', 'Anunaya Agarwal', 'ananya.ag@gmail.com', '8971564546', 'Hi, I came across your website and I’m really impressed with the services you offer. I’m currently exploring options for a project and would love to learn more about how you can help. Could y', '2025-04-30 09:19:10.628', '2025-04-30 09:19:10.628');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int DEFAULT NULL,
  `smallDesc` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `features` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `specifications` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `seoTitle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `seoDescription` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Product_categoryId_fkey` (`categoryId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `categoryId`, `name`, `model`, `price`, `smallDesc`, `description`, `features`, `specifications`, `seoTitle`, `seoDescription`, `image`, `created_at`, `updated_at`) VALUES
('5f572f59-ea3e-4336-aec4-81c6849c2e5c', '67b36d55-aee5-42aa-9828-cd5fefaffe71', 'Our Medical & Lab Equipment', 'OTL-750', 0, 'High-intensity shadow-free lighting for surgical procedures.', 'High-intensity shadow-free lighting for surgical procedures.', '[\"LED technology with adjustable brightness\",\"Shadow-free illumination\",\"Ergonomic and easy-to-adjust arm\"]', '[\"lightIntensity: 130,000 Lux\",\"power: 220V / 50Hz\",\"lifespan: 50,000 hours\"]', 'Our Medical & Lab Equipment', 'High-intensity shadow-free lighting for surgical procedures.', '/uploads/products/cc1ccb90-0480-4b0e-a890-6d1b2ea2f129_prod-3.jpg', '2025-04-26 17:14:05.906', '2025-04-26 17:14:05.906'),
('6746c096-9d09-4090-98ab-1546ef706c7f', '23af51d0-55d4-4c2c-bedb-e1715fed59e1', 'Semi Fowler Bed (SS Panel)', 'SFB-200', 10000, 'Durable stainless steel bed with adjustable backrest for patient comfort.', 'Durable stainless steel bed with adjustable backrest for patient comfort.', '[\"Stainless steel frame\",\"Adjustable backrest\",\"Smooth-rolling caster wheels\"]', '[\"material: Stainless Steel\",\"loadCapacity: 250kg\",\"dimensions: 198cm x 90cm\"]', 'Semi Fowler Bed (SS Panel)', 'Durable stainless steel bed with adjustable backrest for patient comfort.', '/uploads/products/ad08dcf2-2e1f-4d91-9d34-9b9e74462563_prod-2.jpg', '2025-04-26 16:39:04.037', '2025-04-26 16:39:04.037'),
('8a7538f5-d128-4d6f-86e7-53347eb7ef36', 'fe68c9af-449c-40ff-9897-3333de2a6977', 'Multi Parameter Monitor', 'MPM-500', 0, 'Real-time monitoring of vital signs for accurate diagnosis.', 'Real-time monitoring of vital signs for accurate diagnosis.', '[\"Multi-lead ECG monitoring\",\"SpO2 and NIBP measurement\",\"User-friendly touch screen interface\"]', '[\"display: 10.4-inch LCD\",\"battery: 4-hour backup\",\"weight: 5kg\"]', 'Multi Parameter Monitor', 'Real-time monitoring of vital signs for accurate diagnosis.', '/uploads/products/85f7848d-9191-4b05-bfc4-11caf680f58f_image-removebg-preview (1).png', '2025-04-26 16:40:59.437', '2025-04-26 16:40:59.437'),
('ff847b4d-1fca-4507-b364-c243db0e4ec3', '67b36d55-aee5-42aa-9828-cd5fefaffe71', 'Cooker Type Autoclave Single/Double Wall', 'CTA-1000', 5600, 'Reliable steam sterilization for medical and laboratory instruments.', 'Steam sterilization, also known as autoclaving, is one of the most widely used and trusted methods for sterilizing medical and laboratory instruments. Its reliability stems from a combination', '[\"Fast and efficient sterilization\",\"Single/Double-wall stainless steel construction\",\"Automatic pressure control\"]', '[\"power: 220V / 50Hz\",\"capacity: 50 Liters\",\"weight: 30kg\"]', 'Cooker Type Autoclave Single/Double Wall', 'Reliable steam sterilization for medical and laboratory instruments.', '/uploads/products/7b3bfd6f-03a7-48f5-9158-6b423b053ab3_prod-4.jpg', '2025-04-26 15:54:07.291', '2025-04-26 15:54:07.291');

-- --------------------------------------------------------

--
-- Table structure for table `productenquiry`
--

DROP TABLE IF EXISTS `productenquiry`;
CREATE TABLE IF NOT EXISTS `productenquiry` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `ProductEnquiry_productId_fkey` (`productId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `productenquiry`
--

INSERT INTO `productenquiry` (`id`, `productId`, `model`, `name`, `email`, `message`, `contact`, `created_at`, `updated_at`) VALUES
('d5017374-f05b-482b-b697-74954bd9fe9d', '8a7538f5-d128-4d6f-86e7-53347eb7ef36', 'MPM-500', 'Krishna Kant', 'kk.kant@gmail.com', 'Quality is never an accident; it is always the result of intelligent effort.', '8716298525', '2025-04-30 09:53:09.195', '2025-04-30 09:53:09.195');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('USER','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
('00905e41-4e54-4557-9a39-1d28e4176c93', 'Krishna Kant', 'kk.kant@gmail.com', '$2b$10$ToYk34mo9YaZuj0Sf7.xu.DDt87m2N7yy8aT3.9k6kovvivM21QJS', 'USER', '2025-04-30 09:53:57.295', '2025-04-30 09:53:57.295'),
('bbcda5fd-2bbe-48e0-a51d-02c36a535862', 'Vivek Sharma', 'vivek@indutechit.com', 'password', 'USER', '2025-04-29 20:01:24.169', '2025-04-29 20:01:24.169'),
('d96988a0-5281-4761-a58c-64057742c2a5', 'Admin User', 'admin@example.com', '$2b$10$L2oUOr0mlVHnnRKuCsldP.9OXaUH6ErAaDBzEiObzKclGrlGNCa9.', 'ADMIN', '2025-03-30 13:27:31.195', '2025-03-30 13:27:31.195');

-- --------------------------------------------------------

--
-- Table structure for table `websitesettings`
--

DROP TABLE IF EXISTS `websitesettings`;
CREATE TABLE IF NOT EXISTS `websitesettings` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `socialLinks` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `whatsapp` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('33719d48-6f01-496c-85bf-fc8baa8291a8', 'b06dce62ba2efd6a623590f212ce5007c4cccfc1f1184a9d6d9923040ca9a555', '2025-04-30 07:33:33.455', '20250430073333_init', NULL, NULL, '2025-04-30 07:33:33.371', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
