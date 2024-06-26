const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyparser = require('body-parser');

const rotaProdutos = require('./routes/produtos');
const rotaCategorias = require('./routes/categorias');
const rotaPedidos = require('./routes/pedidos');
const rotaUsuarios = require('./routes/usuarios');
const rotaImagens = require('./routes/imagens');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyparser.urlencoded({extended: false})); // apenas dados simples
app.use(bodyparser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});

app.use('/produtos',rotaProdutos);
app.use('/categorias',rotaCategorias);
app.use('/pedidos',rotaPedidos);
app.use('/usuarios',rotaUsuarios);
app.use('/imagens',rotaImagens);

//rota nao encontrada
app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});
module.exports = app;