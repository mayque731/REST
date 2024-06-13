## - API REST

Essa API servira de base para implementação na central de assinante unificada da UNI Internet, nesse momento ela esta preparada para listar informações do cliente, contratos, e financeiro do cliente, com boletos mensal e avulsos, boletos esses que ja terão todas as informações e opções de pagamento, inclusive a opçõe de PIX copia e cola e QRCode.

##

## Instalação & Dependencias


1 - npm init -y

2 - npm install request-promise request jsonwebtoken express bcrypt

3 - npm install nodemon -D


| Dependencia      | Download                                                     |
| --------------- | ------------------------------------------------------------ |
| bcrypt          | ![NPM Version](https://img.shields.io/npm/v/bcrypt)          |
| express         | ![NPM Version](https://img.shields.io/npm/v/express)         |
| jsonwebtoken    | ![NPM Version](https://img.shields.io/npm/v/jsonwebtoken)    |
| nodemon         | ![NPM Version](https://img.shields.io/npm/v/nodemon)         |

## 

## Hierarquia dos Diretorios


|—— controllers
|—— database
|—— middleware
|—— routes
|    |—— boletos.js
|—— test
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
