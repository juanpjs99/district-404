-- District 404 database
-- Fresh local schema for MySQL 8+
-- Do not store real passwords in this file.

CREATE DATABASE IF NOT EXISTS district404
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE district404;

CREATE TABLE IF NOT EXISTS roles (
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE,
  description VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO roles (id, name, description) VALUES
  (1, 'superadmin', 'Administrador total del sistema'),
  (2, 'member', 'Miembro oficial de District 404'),
  (3, 'blog_user', 'Usuario registrado del blog');

CREATE TABLE IF NOT EXISTS Person (
  ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  middleName VARCHAR(100) NULL,
  firstSurname VARCHAR(100) NOT NULL,
  secondLastName VARCHAR(100) NULL,
  IDCard VARCHAR(50) NULL UNIQUE,
  cellular VARCHAR(30) NULL,
  phone VARCHAR(30) NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Users (
  ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  personID INT UNSIGNED NOT NULL,
  UserName VARCHAR(50) NOT NULL UNIQUE,
  Password VARCHAR(255) NOT NULL,
  role_id TINYINT UNSIGNED NOT NULL DEFAULT 3,
  status ENUM('active', 'inactive', 'blocked') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_person FOREIGN KEY (personID) REFERENCES Person(ID) ON DELETE CASCADE,
  CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS Profiles (
  ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  userID INT UNSIGNED NOT NULL UNIQUE,
  biography TEXT NULL,
  profession VARCHAR(150) NULL,
  skills JSON NULL,
  githubUrl VARCHAR(255) NULL,
  linkedinUrl VARCHAR(255) NULL,
  avatarUrl VARCHAR(500) NULL,
  location VARCHAR(150) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_profiles_user FOREIGN KEY (userID) REFERENCES Users(ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Projects (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  owner_id INT UNSIGNED NOT NULL,
  title VARCHAR(180) NOT NULL,
  slug VARCHAR(220) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  type ENUM('personal', 'crew') NOT NULL DEFAULT 'personal',
  cover_url VARCHAR(500) NULL,
  repository_url VARCHAR(500) NULL,
  demo_url VARCHAR(500) NULL,
  technologies JSON NULL,
  status ENUM('planned', 'development', 'published', 'archived') NOT NULL DEFAULT 'development',
  visibility ENUM('public', 'private') NOT NULL DEFAULT 'public',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_projects_owner FOREIGN KEY (owner_id) REFERENCES Users(ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ProjectMembers (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  project_id INT UNSIGNED NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  role VARCHAR(150) NULL,
  contribution TEXT NULL,
  status ENUM('pending', 'accepted', 'rejected') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_project_member (project_id, user_id),
  CONSTRAINT fk_project_members_project FOREIGN KEY (project_id) REFERENCES Projects(id) ON DELETE CASCADE,
  CONSTRAINT fk_project_members_user FOREIGN KEY (user_id) REFERENCES Users(ID) ON DELETE CASCADE
);

-- ============================================================
-- Migration for a database created with the Phase 1 schema
-- Run these two statements only if Profiles already exists
-- without avatarUrl and location.
-- ============================================================
-- ALTER TABLE Profiles ADD COLUMN avatarUrl VARCHAR(500) NULL;
-- ALTER TABLE Profiles ADD COLUMN location VARCHAR(150) NULL;

-- ============================================================
-- Manual superadmin account
-- Generate a bcrypt hash from backend before running these queries.
-- Never commit the real hash or password to the repository.
-- ============================================================
-- INSERT INTO Person (firstName, firstSurname, email)
-- VALUES ('Admin', 'District404', 'admin@district404.local');
-- SET @person_id = LAST_INSERT_ID();
-- INSERT INTO Users (personID, UserName, Password, role_id, status)
-- VALUES (@person_id, 'superadmin', 'PASTE_BCRYPT_HASH_HERE', 1, 'active');
-- SET @user_id = LAST_INSERT_ID();
-- INSERT INTO Profiles (userID, profession)
-- VALUES (@user_id, 'Superadmin');

-- Assign an existing account as a member:
-- UPDATE Users SET role_id = 2 WHERE UserName = 'existing_username';
