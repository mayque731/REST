const mysql = require('../mysql');

exports.getProdutos = async (req,res,next)=>{
    try{
        const result = await mysql.execute('SELECT * FROM produtos')
        const response ={
            quantidade: result.length,
            produtos: result.map(prod => {
                return {
                    id_produto: prod.id_produto,
                    nome: prod.nome_produto,
                    preco: prod.preco_produto,
                    imagem_produto: prod.imagem_produto,
                    id_categoria: prod.id_categoria,
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna todos produtos',
                        url: 'http://localhost:3000/produtos/'
                    }
                }
            })
        }
        return res.status(200).send(response);  
    }catch(error){
        console.log(error);
        return res.status(500).send({error: error});
    }
    
};

exports.postProdutos = async (req, res, next) => {
    try{ 
        const query = 'INSERT INTO produtos (nome_produto, preco_produto, imagem_produto, id_categoria) VALUES (?,?,?,?)';
        const result = mysql.execute(query, [
            req.body.nome, 
            req.body.preco, 
            req.file.path,
            req.body.id_categoria
        ]);
        console.log(result.insertId);
        const response = {
            mensagem: 'produto inserido com sucesso',
            produtoCriado: {
                 id_produto: result.insertId,
                 nome: req.body.nome,
                 preco: req.body.preco,
                 imagem_produto: req.file.path,
                 id_categoria : req.body.id_categoria,
                 request: {
                   tipo: 'GET',
                   descricao: 'Insere um produto',
                   url: 'http://localhost:3000/produtos'
                 }
            }
      }
      return res.status(201).send(response);
    }catch(error){
        console.log(error);
        return res.status(500).send({error: error});
    }
};

exports.getUmProduto = async(req, res, next) => {
    try{
        const queryUP = 'SELECT * FROM produtos WHERE id_produto = ?;';
        const resultUP = await mysql.execute(queryUP, [req.params.id_produto]);
        
        if (resultUP.length == 0) {
            return res.status(404).send({
                mensagem: 'Não foi encontrado produto com este ID'
            });
        }

        const response ={
                
            produto: {
                id_produto: resultUP[0].id_produto,
                nome: resultUP[0].nome,
                preco: resultUP[0].preco,
                imagem_produto: resultUP[0].imagem_produto,
                id_categoria: resultUP[0].id_categoria,
                 request: {
                   tipo: 'GET',
                   descricao: 'Retorna todos produtos',
                   url: 'http://localhost:3000/produtos'
                 }
            }
      }   
        return res.status(201).send(response);
    }catch(error){
        return res.status(500).send({error: error});
    }
    
};

exports.patchProdutos = async (req, res, next) => {
    try{
        const query = `UPDATE produtos 
                          SET nome          = ?,       
                              preco         = ?      
                        WHERE id_produto    = ?`;
        //const query = 'UPDATE produtos SET nome,preco VALUES(?,?) WHERE id_produto = ?';
            await mysql.execute(query, [
            req.body.nome, 
            req.body.preco, 
            req.body.id_produto]);

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
    }catch(error){
        return res.status(500).send({error: error});
    }    
};

exports.deleteProdutos = async (req, res, next) => {
    try{
        const query = 'DELETE FROM produtos WHERE id_produto = ?';
        await mysql.execute(query, [req.body.id_produto]);

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
      return res.status(201).send(response);
    }catch(error){
        return res.status(500).send({error: error});
    }
};

exports.postImagem = async (req, res, next) => {
    try{ 
        const query = 'INSERT INTO imagem_produto (id_produto, caminho_imagem) VALUES (?,?)';
        const result = await mysql.execute(query, [
            req.params.id_produto, 
            req.file.path
        ]);
        const response = {
            mensagem: 'produto inserido com sucesso',
            produtoCriado: {
                 id_produto: parseInt(req.params.id_produto),
                 id_imagem: result.insertId,
                 nome: req.body.nome,
                 preco: req.body.preco,
                 imagem_produto: req.file.path,
                 request: {
                   tipo: 'GET',
                   descricao: 'Insere um produtos',
                   url: 'http://localhost:3000/produtos' + req.params.id_produto + '/imagens'
                 }
            }
      }
      return res.status(201).send(response);
    }catch(error){
        return res.status(500).send({error: error});
    }
};

exports.getImagens = async (req,res,next)=>{
    try{
        const query = 'SELECT * FROM imagem_produto WHERE id_produto = ?';
        const result = await mysql.execute(query, [req.params.id_produto])
        const response ={
            quantidade: result.length,
            produtos: result.map(img => {
                return {
                    id_produto: parseInt(req.params.id_produto),
                    id_imagem: img.id_imagem,
                    caminho: 'http://localhost:3000/'+ img.caminho
                   
                }
            })
        }
        return res.status(200).send(response);  
    }catch(error){
        return res.status(500).send({error: error});
    }
};