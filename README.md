![Logo](https://lh3.googleusercontent.com/p/AF1QipNeh3TtjOzTz7CU1OiOTvM6NQ-TKjjf7CYGfr3P=s280-w280-h150)

## - API Central de Assinante Unificada

Essa API servira de base para implementação na central de assinante unificada da UNI Internet, nesse momento ela esta preparada para listar informações do cliente, contratos, e financeiro do cliente, com boletos mensal e avulsos, boletos esses que ja terão todas as informações e opções de pagamento, inclusive a opçõe de PIX copia e cola e QRCode.

Upgrades previstos para a proxima atualização:

- Desbloqueio Temporário
- Opção para cliente editar informações (Isso depende da IXC, equipe DEV da empresa está em processo de liberação desta rota na API deles.)
- Abertura de chamados (Pode ser uma boa ideia, mas ainda em fase de estudo...)
- Ordens de Serviço - API: Desenvolver endpoints para a consulta de ordens de serviço.
- Desconectar Login - API: Criar endpoint para desconectar usuários, excluindo a sessão pppoe de autenticação.
- Liberar Temporariamente - API: Implementar funcionalidade para liberação temporária. (Haverá ressalva para o uso ainda a definir com financeiro)
- Liberação de Redução de Velocidade - API: Adicionar endpoints para gerenciar a liberação temporária de redução de velocidade.

## 

### Novas Funcionalidades da versão 1.0.10

#### Agora a API conta com :
- Nota Fiscal - Endpoints para consulta de notas fiscais.
- Listar Boletos Pagos Filtrando a Data - lista boletos pagos com a possibilidade de filtrar a data.

E também aplicamos melhorias nas rotas ja existentes, melhorias de segurança foram aplicadas, trazendo maior integridade para os dados sensiveis que trafegam pela API.

Documentação atualizada com as novas funções, e estamos trabalhando para trazer melhorias ainda mais interessantes para a proxima versão.




## Instalação & Dependencias


1 - npm init -y
2 - npm install request-promise request jsonwebtoken express dotenv crypto-js brypt
3 - npm install nodemon -D


| Dependencia      | Download                                                     |
| --------------- | ------------------------------------------------------------ |
| bcrypt          | ![NPM Version](https://img.shields.io/npm/v/bcrypt)          |
| crypto-js       | ![NPM Version](https://img.shields.io/npm/v/crypto-js)       |
| dotenv          | ![NPM Version](https://img.shields.io/npm/v/dotenv)          |
| express         | ![NPM Version](https://img.shields.io/npm/v/express)         |
| jsonwebtoken    | ![NPM Version](https://img.shields.io/npm/v/jsonwebtoken)    |
| request         | ![NPM Version](https://img.shields.io/npm/v/request)         |
| request-promise | ![NPM Version](https://img.shields.io/npm/v/request-promise) |
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

#### Retorna o token do cliente:

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
