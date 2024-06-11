const express = require('express');
const router = express.Router();
const multer = require ('multer'); //para tratamento do formdata
const login = require('../middleware/login');//metodos que sao executados na rota antes de chegar na funcao final

const imagensController = require('../controllers/imagens-controller');

router.delete('/:id_imagem',login.obrigatorio, imagensController.deleteImagem);

module.exports = router;