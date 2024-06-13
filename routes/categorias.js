const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const categoriasController = require('../controllers/categorias-controller');

router.get('/', categoriasController.getCategorias);
router.post('/', login.obrigatorio, categoriasController.postCategorias);

module.exports = router;