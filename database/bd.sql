CREATE DATABASE ecommerce;
USE ecommerce;

CREATE TABLE IF NOT EXISTS categorias (
id_categoria INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
nome_categoria VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS produtos (
id_produto INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
nome_produto VARCHAR(45) NOT NULL,
preco_produto FLOAT NOT NULL,
imagem_produto VARCHAR(255) NOT NULL,
id_categoria INT NOT NULL,
FOREIGN KEY (id_categoria) REFERENCES categorias (id_categoria)
);

CREATE TABLE  IF NOT EXISTS pedidos (
id_pedido INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
id_produto INT NOT NULL,
quantidade_pedido INT NOT NULL,
FOREIGN KEY (id_produto) REFERENCES produtos (id_produto)
);

CREATE TABLE  IF NOT EXISTS usuarios (
id_usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
email_usuario VARCHAR(100),
senha_usuario VARCHAR(500)
);

CREATE TABLE  IF NOT EXISTS imagem_produto (
id_imagem INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
id_produto INT NOT NULL,
caminho_imagem VARCHAR(255),
FOREIGN KEY (id_produto) REFERENCES produtos (id_produto)
);