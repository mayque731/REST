const mysql = require('../mysql');

exports.getCategorias = async (req, res, next) => {
    try {
        const result = await mysql.execute("SELECT * FROM categorias;")
        const response = {
            quantidade: result.length,
            categories: result.map(categoria => {
                return {
                    categoryId: categoria.id_categoria,
                    name: categoria.nome_categoria
                }
            })
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.postCategorias = async (req, res, next) => {
    try {
        const query = 'INSERT INTO categorias (nome_categoria) VALUES (?)';
        const result = await mysql.execute(query, [req.body.nome]);

        const response = {
            message: 'Categoria inserida com sucesso',
            CategoriaCriada: {
                id_categoria: result.insertId,
                nome_categoria: req.body.name,
                request: {
                    type: 'GET',
                    description: 'Retorna todas as categorias',
                    url: process.env.URL_API + 'categorias'
                }
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};