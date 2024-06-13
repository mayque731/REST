const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidos-controller');

//retorna todos os pedidos
router.get('/', pedidosController.getPedidos);

//insere um pedido
router.post('/', pedidosController.postPedidos);

//retorna pedido exclusivo
router.get('/:id_pedido', pedidosController.getUmPedido);

//exclusao de pedido
router.delete('/:id_pedido', pedidosController.deletePedido);

module.exports = router;