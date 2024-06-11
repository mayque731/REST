const mysql = require('../mysql');

exports.deleteImagem = async (req, res, next) => {
    try{
        const query = 'DELETE FROM imagem_produto WHERE id_imagem = ?';
        await mysql.execute(query, [req.params.id_imagem]);

        const response = {
            mensagem: 'Imagem removida com sucesso',
            request: {
               tipo: 'POST',
               descricao: 'Insere um produto',
               url: 'http://localhost:3000/produtos/'+req.body.id_produto+'/imagens',
               body: {
                   id_produto: 'Number',
                   id_imagem: 'File'
               }
            }
      }
      return res.status(201).send(response);
    }catch(error){
        return res.status(500).send({error: error});
    }
};