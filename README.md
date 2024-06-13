## - API REST

API REST desenvolvida como treinamento
Formato de ecommerce, tratando usuarios, produtos, categorias, pedidos

##

## Instalação & Dependencias
- npm install request jsonwebtoken express bcrypt nodemon mysql morgan ngrok multer


| Dependencia     | Download                                                     |
| --------------- | ------------------------------------------------------------ |
| bcrypt          | ![NPM Version](https://img.shields.io/npm/v/bcrypt)          |
| express         | ![NPM Version](https://img.shields.io/npm/v/express)         |
| jsonwebtoken    | ![NPM Version](https://img.shields.io/npm/v/jsonwebtoken)    |
| nodemon         | ![NPM Version](https://img.shields.io/npm/v/nodemon)         |
| mysql           | ![NPM Version](https://img.shields.io/npm/v/mysql)           |
| morgan          | ![NPM Version](https://img.shields.io/npm/v/morgan)          |
| ngrok           | ![NPM Version](https://img.shields.io/npm/v/ngrok)           |
| multer          | ![NPM Version](https://img.shields.io/npm/v/multer)          |


## 

## Hierarquia dos Diretorios


|—— controllers
|    |—— categorias-controller.js
|    |—— imagens-controller.js
|    |—— pedidos-controller.js
|    |—— produtos-controller.js
|    |—— usuarios-controller.js
|—— database
|    |—— bd.sql
|—— middleware
|    |—— login.js
|—— routes
|    |—— categorias.js
|    |—— imagens.js
|    |—— pedidos.js
|    |—— produtos.js
|    |—— usuarios.js
|—— test
|    |—— categoria.http
|    |—— pedido.http
|    |—— produto.http
|    |—— usuario.http
|—— uploads
|── .env
├── .gitignore
├── app.js
├── ecommerce.session.sql
├── mysql.js
├── nodemon.json
├── package-lock.json
├── package.json
├── README.md
└── server.js

##
## Documentação da API
## Usuarios

http
  POST /usuarios/cadastro


| Parâmetro | Tipo     | Descrição                                                                                                                                   |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| email   | texto | Email do usuario, usado na função de login 
| senha   | texto | Senha de usuario, usada na função de login                             

## 
http
  POST /usuarios/login


| Parâmetro | Tipo     | Descrição                                                                                                                                   |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| email   | texto | Email do usuario, definido na função de cadastro
| senha   | texto | Senha de usuario, definido na função de cadastro                            

## 

## Categorias

http
  GET /categorias
    Retorna todas categorias, não requer autenticação 

| Parâmetro | Tipo     | Descrição                                                                                                                                   |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
                            

## 
http
  POST /categorias


| Parâmetro | Tipo     | Descrição                                                                                                                                   |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| Authorization   | Bearer | Token retornado da função de login 
| nome   | texto | Nome da categoria sendo inserida                             

## 

## Produtos

http
  GET /produtos
    Retorna todos produtos, não requer autenticação   

| Parâmetro | Tipo     | Descrição                                                                                                                                   |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
##
http
  GET /produtos/id
    Retorna dado de um especifico produto, não requer autenticação   

| Parâmetro | Tipo     | Descrição                                                                                                                                   |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
                          

## 
http
  POST /produtos
    inserede produto, requer autenticação

| Parâmetro | Tipo     | Descrição                                                                                                                                   |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| Authorization   | Bearer | Token retornado da função de login 
| imagem   | arquivo | arquivo da imagem do produto                             
| nome   | texto | Nome do produto sendo inserido                            
| preco   | texto | preco do produto sendo inserido                         
| categoria   | texto | id da categoria do produto sendo inserido                            

## 
http
  PATCH /produtos/id
    altera nome e preco de um produto

| Parâmetro | Tipo     | Descrição                                                                                                                                   |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| Authorization   | Bearer | Token retornado da função de login                             
| nome   | texto | Novo nome do produto sendo alterado                            
| preco   | texto | Novo preco do produto sendo alterado                     

## 
http
  DELETE /produtos/id
    deleta um preduto, requer autenticação

| Parâmetro | Tipo     | Descrição                                                                                                                                   |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| Authorization   | Bearer | Token retornado da função de login 
                         

## 

## Pedidos

http
  GET /pedidos
    Retorna todos pedidos, não requer autenticação   

| Parâmetro | Tipo     | Descrição                                                                                                                                   |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------ |

##
http
  GET /pedidos/id
    Retorna dados de um especifico pedido, não requer autenticação   

| Parâmetro | Tipo     | Descrição                                                                                                                                   |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
                          

## 
http
  POST /pedidos
    insere um pedido, não requer autenticação   

| Parâmetro | Tipo     | Descrição                                                                                                                                   |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| id_produto   | texto | id do produto a ser pedido                            
| quantidade_produto   | texto | quantidade a ser pedida do produto    

## 
http
  DELETE /pedidos/id
    deleta um pedido, nao requer autenticação

| Parâmetro | Tipo     | Descrição                                                                                                                                   |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
