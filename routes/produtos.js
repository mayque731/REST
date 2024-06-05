const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//retorna todos os produtos
router.get('/', (req, res, next) => {
    //res.status(200).send({
     //   mensagem: 'usando GET dentro da rota de produtos'
    //});
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            'SELECT * FROM produtos;',
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response ={
                    quantidade: resultado.length,
                    produtos: resultado.map(prod => {
                        return {
                            id_produto: prod.id_produto,
                            nome: prod.nome,
                            preco: prod.preco,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos produtos',
                                url: 'http://localhost:3000/produtos/'
                            }
                        }
                    })
                }
                return res.status(200).send(response);               
            }
        )
    });
});

//insere um produto
router.post('/', (req, res, next) => {
   
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query('INSERT INTO produtos (nome, preco) VALUES (?,?)',
        [req.body.nome, req.body.preco],
        (error, resultado, field) => {
            conn.release();
            if (error) {return res.status(500).send({error: error})}
               const response = {
                     mensagem: 'produto inserido com sucesso',
                     produtoCriado: {
                          id_produto: resultado.insertId,
                          nome: req.body.nome,
                          preco: req.body.preco,
                          request: {
                            tipo: 'GET',
                            descricao: 'Insere um produtos',
                            url: 'http://localhost:3000/produtos'
                          }
                     }
               }
               
           
            res.status(201).send(response);
        });
    });
});

//retorna um produto
router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?;',
                        (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (resultado.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado produto com este ID'
                    });
                }
                const response ={
                
                produto: {
                     id_produto: resultado[0].id_produto,
                     nome: resultado[0].nome,
                     preco: resultado[0].preco,
                     request: {
                       tipo: 'GET',
                       descricao: 'Retorna um produto',
                       url: 'http://localhost:3000/produtos'+prod.id_produto
                     }
                }
          }   
            return res.status(201).send(response);
            }
        )
    });
});

//atualizacao de produto
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(`UPDATE produtos
        SET nome = ?,
            preco = ?
        WHERE id_produto = ?`,
        [req.body.nome, req.body.preco, req.body.id_produto],
        
            (error, resultado, field) => {
                conn.release();
                if (error) {return res.status(500).send({error: error})}
                   const response = {
                         mensagem: 'produto atualizado com sucesso',
                         produtoAtualizado: {
                              id_produto: req.body.id_produto,
                              nome: req.body.nome,
                              preco: req.body.preco,
                              request: {
                                tipo: 'GET',
                                descricao: 'retorna detalhes de um produto',
                                url: 'http://localhost:3000/produtos' + req.body.id_produto
                              }
                         }
                   }
                   
               
                return res.status(201).send(response);
                res.status(202)
            });
            
        });
    });

//exclusao de produto
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(`DELETE FROM produtos WHERE id_produto = ?`,[req.body.id_produto],
        (error, resultado, field) => {
            conn.release();
            if (error) { return res.status(500).send({error: error}); }
            const response = {
                mensagem: 'produto removido com sucesso',
                request: {
                    tipo: 'POST',
                    descricao: 'Insere um produto',
                    url: 'http://localhost:3000/produtos',
                    body: {
                        nome: 'String',
                        preco: 'Number'
                    }
                }
            }
            return res.status(202).send({response});
         });
    });
});
module.exports = router;