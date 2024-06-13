## - API REST

Essa API servira de base para implementação na central de assinante unificada da UNI Internet, nesse momento ela esta preparada para listar informações do cliente, contratos, e financeiro do cliente, com boletos mensal e avulsos, boletos esses que ja terão todas as informações e opções de pagamento, inclusive a opçõe de PIX copia e cola e QRCode.

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


|—— .env.example
|—— .gitattributes
|—— .gitignore
|—— requestPostman
|    |—— postman_collection.json
|—— routes
|    |—— boletos.js
|    |—— boletosPagos.js
|    |—— login.js
|    |—— me.js
|    |—— pix.js
|—— server.js
|—— utils
|   ├── encrypt.js
|   ├── decrypt.js
|   ├── getCliente.js
|   ├── getContratos.js
|   ├── getFaturas.js
|   ├── getFaturasPagas.js
|   ├── getListaPix.js
|   ├── getPix.js
|   ├── fetchData.js
|   └── index.js


## Documentação da API

http
  POST /auth/login


| Parâmetro | Tipo     | Descrição                                                                                                                                   |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| email   | bearer | *Obrigatório*. O email ou CPF do cliente, depende de como esta cadastrado no campo "Login:" Sistema_IXC/Cliente/Contato/Central Assinante |
| senha   | bearer | *Obrigatório*. A senha que esta cadastrada no campo "Senha:" em Sistema_IXC/Cliente/Contato/Central Assinante                             |

## 

#### Retorna os dados de cadastro do cliente/contrato:

http
  GET /user/me


| Parâmetro | Tipo            | Descrição                                                     |
| :-------- | :-------------- | :------------------------------------------------------------ |
| token   | Authorization | *Obrigatório*. O token JWT assinado que foi gerado no login |

## 

#### Retorna todos as faturas em aberto do cliente, faturas/pix:

http
  GET /faturas/abertas


| Parâmetro | Tipo            | Descrição                                                     |
| :-------- | :-------------- | :------------------------------------------------------------ |
| token   | Authorization | *Obrigatório*. O token JWT assinado que foi gerado no login |

## 

#### Retorna todos as faturas recebidas do cliente, filtrando por data do pagamento da fatura:

http
  GET /faturas/recebidas


| Parâmetro    | Tipo            | Descrição                                                     |
| :----------- | :-------------- | :------------------------------------------------------------ |
| token      | Authorization | *Obrigatório*. O token JWT assinado que foi gerado no login |
| dataInicio | bearer        | *Obrigatório*. Deve conter a data inicial do filtro         |
| dataFim    | bearer        | *Obrigatório*. Deve conter a data final do filtro           |

## 

#### Retorna somente o codigo pix das faturas em abertas do cliente:

http
  GET /faturas/pix


| Parâmetro | Tipo            | Descrição                                                     |
| :-------- | :-------------- | :------------------------------------------------------------ |
| token   | Authorization | *Obrigatório*. O token JWT assinado que foi gerado no login |

## 

#### Retorna as notas fiscais modelo 21 dos contratos:

http
  GET /financeiro/notas_fiscais


| Parâmetro | Tipo            | Descrição                                                     |
| :-------- | :-------------- | :------------------------------------------------------------ |
| token   | Authorization | *Obrigatório*. O token JWT assinado que foi gerado no login |

##
