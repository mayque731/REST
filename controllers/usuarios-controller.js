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
        const hash = bcrypt.hashSync(req.body.senha, 10);


        const query = 'INSERT INTO usuarios (email, senha) VALUES (?,?)';
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
        const query = 'SELECT * FROM usuarios WHERE email = ?';
        const results = await mysql.execute(query, [req.body.email]);

        if (results.length < 1) {
            return res.status(401).send({ message: 'Falha na autenticação' })
        }
        if (bcrypt.compareSync(req.body.senha, results[0].senha)) {
            const token = jwt.sign({
                id_usuario: results[0].id_usuario,
                email: results[0].email,
            },
            chave,
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
// exports.loginUsuario = async (req, res, next) => {
//     try {
//         const query = 'SELECT * FROM usuarios WHERE email = ?';
//         const results = await mysql.execute(query, [req.body.email]);
//         if (results.length < 1) {
//             return res.status(401).send({ message: 'Falha na autenticação' })
//         
//         if ( bcrypt.compareSync(req.body.senha, results[0].senha)) {
//             const token = jwt.sign({
//                 id_usuario: results[0].id_usuario,
//                 email: results[0].email,
//             },
//             process.env.JWT_KEY,
//             //'segredo',
//             {
//                 expiresIn: "7d"
//             });
//             return res.status(200).send({
//                 message: 'Autenticado com sucesso',
//                 token: token
//             });
//         }
//         return res.status(401).send({ message: 'Falha na autenticação' })
//     } catch (error) {
//         console.log(error);
//         console.log(chave);
//         return res.status(500).send({ message: 'Falha na autenticação2' });
//     }
// };