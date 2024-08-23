-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 23, 2024 at 03:35 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api_docs`
--

-- --------------------------------------------------------

--
-- Table structure for table `cafes`
--

CREATE TABLE `cafes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cafes`
--

INSERT INTO `cafes` (`id`, `name`, `address`, `phoneNumber`, `createdAt`, `updatedAt`) VALUES
(1, 'Mekar Jaya', 'Jl. Soekarno Hatta', NULL, '2024-08-19 10:41:32', '2024-08-19 10:41:32'),
(2, 'Jasa Ayah', 'Jl. Ciliwung', NULL, '2024-08-19 10:41:32', '2024-08-19 10:41:32');

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `isRecommendation` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `name`, `price`, `isRecommendation`, `createdAt`, `updatedAt`) VALUES
(1, 'Nasi Telur', 8000, 1, '2024-08-19 10:41:32', '2024-08-19 14:09:17'),
(2, 'Es Teh', 3000, 0, '2024-08-19 10:41:32', '2024-08-19 14:09:37'),
(3, 'Nasi Goreng', 12000, 1, '2024-08-19 14:05:09', '2024-08-19 14:05:09'),
(5, 'Jeruk Peras', 80, NULL, '2024-08-22 08:04:12', '2024-08-22 08:04:12'),
(6, 'Jeruk Peras', 7500, 1, '2024-08-22 08:05:39', '2024-08-22 08:05:39');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240819082647-create-user.js'),
('20240819082731-create-cafe.js'),
('20240819082829-create-menu.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('superadmin','owner','manager') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `fullname`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'Admin', '202cb962ac59075b964b07152d234b70', 'superadmin', '2024-08-19 10:41:32', '2024-08-19 10:41:32'),
(2, 'owner', 'Owner', '202cb962ac59075b964b07152d234b70', 'owner', '2024-08-19 10:41:32', '2024-08-19 10:41:32'),
(3, 'manager', 'Manager', '202cb962ac59075b964b07152d234b70', 'manager', '2024-08-19 10:41:32', '2024-08-19 10:41:32'),
(4, 'admin2', 'Admin Kedua', '202cb962ac59075b964b07152d234b70', 'superadmin', '2024-08-19 10:52:16', '2024-08-19 10:52:16'),
(5, 'admin3', 'Admin Kedua', '202cb962ac59075b964b07152d234b70', 'superadmin', '2024-08-19 11:14:11', '2024-08-19 11:14:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cafes`
--
ALTER TABLE `cafes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cafes`
--
ALTER TABLE `cafes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
