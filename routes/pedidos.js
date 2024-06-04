const express = require('express');
const router = express.Router();

//retorna todos os pedidos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'usando GET dentro da rota de pedidos'
    });
});

//insere um pedido
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando POST dentro da rota de pedidos'
    });
});

router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto
    if (id === 'especial') {
        res.status(200).send({
            mensagem: 'usando GET de um pedido exclusivo',
            id: id
        });
    } else {
        res.status(200).send({
            mensagem: 'usando GET de um pedido',
            id: id
        });
    }
    res.status(200).send({
        mensagem: 'usando GET de um pedido exclusivo',
        id: id
    });
});



//exclusao de pedido
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando DELETE dentro da rota de pedidos'
    });
});
module.exports = router;