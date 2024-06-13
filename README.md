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
| email   | texto | Email do usuario, usado na função de login 
| senha   | texto | Senha de usuario, usada na função de login                             

## 

## Categorias

http
  GET /categorias


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