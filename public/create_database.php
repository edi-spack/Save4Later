 <?php
$servername = "localhost";
$username = "root";
$password = "";

// Create connection
$conn = new mysqli($servername, $username, $password);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE `save4later`";
$conn->query($sql);
$sql = "USE `save4later`";
$conn->query($sql);

// Create tables
$sql = "CREATE TABLE `login-uids` (
  `uid` varchar(15) PRIMARY KEY NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `creationDate` datetime NOT NULL
)";
$conn->query($sql);

$sql = "CREATE TABLE `notes` (
  `noteId` varchar(15) PRIMARY KEY NOT NULL,
  `text` text NOT NULL,
  `user` varchar(50) NOT NULL,
  `creationDate` datetime NOT NULL
)";
$conn->query($sql);

$sql = "CREATE TABLE `users` (
  `email` varchar(50) PRIMARY KEY NOT NULL,
  `password` varchar(20) NOT NULL
)";
$conn->query($sql);

$conn->close();
?> 