const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.cadastroUsuario = async (req, res, next) => {
    try{
        //verificação se o email já está cadastrado
        var queryUsuario = 'SELECT * FROM usuarios WHERE email_usuario = ?';
        var resultUsuario = await mysql.execute(queryUsuario, [req.body.email]);

        if (resultUsuario.length > 0) {
            return res.status(409).send({ message: 'Usuário já cadastrado' });
        }
        //criptografando a senha
        const hash = bcrypt.hashSync(req.body.senha, 10);

        // const usuarios = req.body.usuarios.map(usuario => [
        //     usuario.email,
        //     bcrypt.hashSync(usuario.senha, 10)
        // ])
        // const query = 'INSERT INTO usuarios (email_usuario, senha_usuario) VALUES ?';
        // const results = await mysql.execute(query, [usuarios]);

        const query = 'INSERT INTO usuarios (email_usuario, senha_usuario) VALUES (?,?)';
        const results = await mysql.execute(query, [req.body.email, hash]);

        const response = {
            message: 'Usuário criado com sucesso',
            usuariosCriados: {
                id_usuario: results.insertId,
                email: req.body.email,
                hash: hash,
                password: req.body.senha
            },
        }
        return res.status(201).send(response);
    }catch(error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
};

exports.loginUsuario = async (req, res, next) => {
    try{
        const query = 'SELECT * FROM usuarios WHERE email_usuario = ?';
        const results = await mysql.execute(query, [req.body.email]);

        if (results.length < 1) {
            return res.status(401).send({ message: 'Falha na autenticação' })
        }
        if (bcrypt.compareSync(req.body.senha, results[0].senha_usuario)) {
            const token = jwt.sign({
                id_usuario: results[0].id_usuario,
                email: results[0].email_usuario,
            },
            process.env.JWT_KEY,
            {
                expiresIn: "7d"
            });
            return res.status(200).send({
                message: 'Autenticado com sucesso',
                token: token
            });
        }
    }catch(error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
}
