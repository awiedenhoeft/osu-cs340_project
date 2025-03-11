-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el9.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 13, 2025 at 01:52 PM
-- Server version: 10.11.10-MariaDB-log
-- PHP Version: 8.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_wiedenha`
--

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `clientID` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phoneNum` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`clientID`, `firstName`, `lastName`, `email`, `phoneNum`) VALUES
(1, 'Alex', 'Wiedenhoeft', 'wiedenhoeft@osu.com', '5034731234'),
(2, 'Kaye', 'DelaChica', 'delachica@osu.com', '8083981234'),
(3, 'Tony', 'James', 'james@osu.com', '6198450040'),
(4, 'Gina', 'Lee', 'lee@osu.com', '970336'),
(5, 'Henry', 'Adams', 'adams@osu.com', '622111');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `invoiceID` int(11) NOT NULL,
  `clientID` int(11) NOT NULL,
  `invoiceDate` date DEFAULT NULL,
  `totalAmount` decimal(10,2) DEFAULT NULL,
  `paymentDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`invoiceID`, `clientID`, `invoiceDate`, `totalAmount`, `paymentDate`) VALUES
(301, 1, '2025-01-03', 20000.00, '2025-07-30'),
(302, 2, '2027-03-26', 25000.00, '2027-05-24'),
(303, 3, '2026-01-23', 18000.00, '2026-04-02'),
(304, 4, '2025-12-14', 30000.00, '2026-01-18'),
(305, 5, '2025-10-01', 7500.00, '2025-12-15');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `serviceID` int(11) NOT NULL,
  `serviceName` varchar(50) NOT NULL,
  `serviceType` varchar(50) DEFAULT NULL,
  `serviceCost` decimal(10, 2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`serviceID`, `serviceName`, `serviceType`, `serviceCost`) VALUES
(201, 'Live Band', 'Music', 2500),
(202, 'Catering', 'Food', 7000),
(203, 'Photographer', 'Photography', 6000),
(204, 'Stylist', 'Decor', 4000),
(205, 'Bartender', 'Food', 1500);

-- --------------------------------------------------------

--
-- Table structure for table `weddings`
--

CREATE TABLE `weddings` (
  `weddingID` int(11) NOT NULL,
  `clientName` int(11) NOT NULL,
  `weddingDate` date NOT NULL,
  `location` varchar(50) NOT NULL,
  `weddingType` varchar(50) DEFAULT NULL,
  `totalBudget` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `weddings`
--

INSERT INTO `weddings` (`weddingID`, `clientID`, `weddingDate`, `location`, `weddingType`, `totalBudget`) VALUES
(101, 1, '2025-12-03', 'Japan', 'Garden', 20000.00),
(102, 2, '2027-11-26', 'Hawaii', 'Traditional', 25000.00),
(103, 3, '2026-07-23', 'Hawaii', 'Beach', 18000.00),
(104, 4, '2026-04-14', 'Chicago', 'City', 30000.00),
(105, 5, '2026-01-01', 'Oregon', 'Black Tie', 7500.00);

-- --------------------------------------------------------

--
-- Table structure for table `weddingServices`
--

CREATE TABLE `weddingServices` (
  `weddingID` int(11) NOT NULL,
  `serviceID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `weddingServices`
--

INSERT INTO `weddingServices` (`weddingID`, `serviceID`) VALUES
(101, 201),
(102, 202),
(103, 203),
(104, 204),
(105, 205);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`clientID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`invoiceID`),
  ADD KEY `clientID` (`clientID`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`serviceID`),
  ADD UNIQUE KEY `serviceName` (`serviceName`);

--
-- Indexes for table `weddings`
--
ALTER TABLE `weddings`
  ADD PRIMARY KEY (`weddingID`),
  ADD KEY `clientID` (`clientID`);

--
-- Indexes for table `weddingServices`
--
ALTER TABLE `weddingServices`
  ADD PRIMARY KEY (`weddingID`,`serviceID`),
  ADD KEY `serviceID` (`serviceID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `clientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `invoiceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=306;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `serviceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=206;

--
-- AUTO_INCREMENT for table `weddings`
--
ALTER TABLE `weddings`
  MODIFY `weddingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`clientID`) REFERENCES `clients` (`clientID`) ON DELETE CASCADE;

--
-- Constraints for table `weddings`
--
ALTER TABLE `weddings`
  ADD CONSTRAINT `weddings_ibfk_1` FOREIGN KEY (`clientID`) REFERENCES `clients` (`clientID`) ON DELETE CASCADE;


--
-- Constraints for table `weddingServices`
--
ALTER TABLE `weddingServices`
  ADD CONSTRAINT `weddingServices_ibfk_1` FOREIGN KEY (`weddingID`) REFERENCES `weddings` (`weddingID`),
  ADD CONSTRAINT `weddingServices_ibfk_2` FOREIGN KEY (`serviceID`) REFERENCES `services` (`serviceID`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
