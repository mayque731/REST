CREATE DATABASE ecommerce;
USE ecommerce;

CREATE TABLE IF NOT EXISTS products (
id_product INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
name_product VARCHAR(45) NOT NULL,
price_product FLOAT NOT NULL,
Image_product VARCHAR(255) NOT NULL
);

CREATE TABLE  IF NOT EXISTS orders (
Id_order INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
Id_product INT NOT NULL,
quantity_order INT NOT NULL,
FOREIGN KEY (productId) REFERENCES products (id_product)
);

CREATE TABLE  IF NOT EXISTS users (
id_user INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
email_user VARCHAR(100),
password_user VARCHAR(500)
);

CREATE TABLE  IF NOT EXISTS productImages (
id_image INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
id_product INT NOT NULL,
path_image VARCHAR(255),
FOREIGN KEY (id_product) REFERENCES products (id_product)
);

CREATE TABLE IF NOT EXISTS categories (
id_categorie INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
name_categorie VARCHAR(100) NOT NULL
);