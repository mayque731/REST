const mysql = require("../mysql").pool;

exports.getPedidos = (req, res, next) => {
  try {
  } catch (error) {
    return res.status(500).send({ error: error });
  }
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `SELECT pedidos.id_pedidos,
                    pedidos.quantidade,
                    produtos.id_produto,
                    produtos.nome,
                    produtos.preco
              FROM  pedidos
        INNER JOIN  produtos
                ON  produtos.id_produto = pedidos.id_produto;`,
      (error, resultado, fields) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          pedidos: resultado.map((pedido) => {
            return {
              id_pedido: pedido.id_pedidos,
              quantidade: pedido.quantidade,
              produto: {
                id_produto: pedido.id_produto,
                nome: pedido.nome,
                preco: pedido.preco,
              },
              request: {
                tipo: "GET",
                descricao: "Retorna todos pedidos",
                url: "http://localhost:3000/produtos/" + pedido.id_produto,
              },
            };
          }),
        };
        return res.status(200).send(response);
      }
    );
  });
};

exports.postPedidos = async(req, res, next) => {
  try {
    const queryProduto = "SELECT * FROM produtos WHERE id_produto = ?";
    const resultProduto = await mysql.execute(queryProduto, [req.body.id_produto]);

    if (resultProduto.length == 0) {
      return res.status(404).send({
        mensagem: "Produto não encontrado",
      });
    }

    const queryPedido = "INSERT INTO pedidos (quantidade, id_produto) VALUES (?,?)";
    const resultPedido = await mysql.execute(queryPedido, [
      req.body.quantidade,
      req.body.id_produto,
    ]);

    const response = {
      mensagem: "pedido inserido com sucesso",
      produtoCriado: {
        id_pedido: resultPedido.id_pedido,
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade,
        request: {
          tipo: "GET",
          descricao: "Retorna todos pedidos",
          url: "http://localhost:3000/pedidos",
        },
      },
    };
          res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }  
};

exports.getUmPedido = async(req, res, next) => {
  try {
    const query = "SELECT * FROM pedidos WHERE id_pedidos = ?";
    const result = await mysql.execute(query, [req.params.id_pedidos]);

    if (result.length == 0) {
      return res.status(404).send({
        mensagem: "Não foi encontrado produto com este ID",
      });
    }

    const response = {
      pedido: {
        id_pedido: result[0].id_pedido,
        id_produto: result[0].id_produto,
        quantidade: result[0].quantidade,
        request: {
          tipo: "GET",
          descricao: "Retorna um pedido",
          url: "http://localhost:3000/pedidos",
        },
      },
    };
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }  
};

exports.deletePedido = async(req, res, next) => {
  try {
    const queryPedido = "SELECT * FROM pedidos WHERE id_pedidos = ?";
    const result = await mysql.execute(queryPedido, [req.body.id_pedido]);

    if (result.length == 0) {
      return res.status(404).send({
        mensagem: "Pedido não encontrado",
      });
    }

    const query = "DELETE FROM pedidos WHERE id_pedidos = ?";
    resultPedido = await mysql.execute(query, [req.body.id_pedido]);
    const response = {
      mensagem: "pedido removido com sucesso",
      request: {
        tipo: "POST",
        descricao: "Insere um pedido",
        url: "http://localhost:3000/pedidos",
        body: {
          id_produto: "Number",
          quantidade: "Number",
        },
      },
    };
    return res.status(202).send({ response });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};
