const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.cadastroUsuario = async (req, res, next) => {
    try{
        //verificação se o email já está cadastrado
        var queryUsuario = 'SELECT * FROM usuarios WHERE email = ?';
        var resultUsuario = await mysql.execute(queryUsuario, [req.body.email]);

        if (resultUsuario.length > 0) {
            return res.status(409).send({ message: 'Usuário já cadastrado' });
        }
        //criptografando a senha
        const hash = await bcrypt.hashSync(req.body.password, 10);


        const query = 'INSERT INTO usuarios (email, senha) VALUES (?,?)';
        const results = await mysql.execute(query, [req.body.email, hash]);

        const response = {
            message: 'Usuário criado com sucesso',
            usuariosCriados: {
                id_usuario: results.insertId,
                email: req.body.email,
                hash: hash,
                password: req.body.password
            },
        }
        return res.status(201).send(response);
    }catch(error) {
        return res.status(500).send({ error: error });
    }
};

exports.loginUsuario = async (req, res, next) => {
    try{
        const query = `SELECT * FROM usuarios WHERE email = ?`;
        var results = await mysql.execute(query, [req.body.email]);

        if (results.length < 1) {
            return res.status(401).send({ message: 'Falha na autenticação' })
        }

        if ( bcrypt.compareSync(req.body.senha, results[0].senha)) {//compara senha inserida com senha da consulta
            const token = jwt.sign({
                id_usuario: results[0].id_usuario,
                email: results[0].email
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
        return res.status(401).send({ message: 'Falha na autenticação' })
    }catch(error){
        return res.status(500).send({ error: error });
      
    }
    
};