const express = require('express');
const router = express.Router();
const multer = require ('multer'); //para tratamento do formdata
const login = require('../middleware/login');
const produtosController = require('../controllers/produtos-controller');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
       cb(null, './uploads/');
   },
  filename: function(req, file, cb){
       cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
   }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }

}


const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//retorna todos os produtos
router.get('/', produtosController.getProdutos );

//insere um produto
//middleware = metodos que sao executados na rota antes de chegar na funcao final
router.post('/', login.obrigatorio,upload.single('produto_imagem'), produtosController.postProdutos);

//retorna um produto
router.get('/:id_produto', produtosController.getUmProduto);

//atualizacao de produto
router.patch('/',login.obrigatorio, );
    

//exclusao de produto
router.delete('/',login.obrigatorio, produtosController.deleteProdutos);
module.exports = router;