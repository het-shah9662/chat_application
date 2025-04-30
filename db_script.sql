-- Create Database
CREATE DATABASE chatdb;
GO

USE chatdb;
GO

-- Create Users Table
CREATE TABLE Users (
  id INT IDENTITY(1,1) PRIMARY KEY,
  username NVARCHAR(100) NOT NULL,
  socketId NVARCHAR(255) NOT NULL
);
GO

-- Create Messages Table
CREATE TABLE Messages (
  id INT IDENTITY(1,1) PRIMARY KEY,
  username NVARCHAR(100) NOT NULL,
  text NVARCHAR(MAX) NOT NULL,
  time NVARCHAR(100) NOT NULL
);
GO
