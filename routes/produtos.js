const express = require('express');
const router = express.Router();

//retorna todos os produtos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'usando GET dentro da rota de produtos'
    });
});

//insere um produto
router.post('/', (req, res, next) => {
    const produto = {
        nome : req.body.nome,
        preco : req.body.preco,
        produtoCriado: produto
    };
    res.status(201).send({
        mensagem: 'usando POST dentro da rota de produtos'
    });
});

router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto
    if (id === 'especial') {
        res.status(200).send({
            mensagem: 'usando GET de um produto exclusivo',
            id: id
        });
    } else {
        res.status(200).send({
            mensagem: 'usando GET de um produto',
            id: id
        });
    }
    res.status(200).send({
        mensagem: 'usando GET de um produto exclusivo',
        id: id
    });
});

//atualizacao de produto
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando PATCH dentro da rota de produtos'
    });
});

//exclusao de produto
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando DELETE dentro da rota de produtos'
    });
});
module.exports = router;