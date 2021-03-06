'use strict'
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.load(
    {
        path: '.env'
    }
)

exports.generateToken = async (data) => {
    return jwt.sign(data, process.env.SALT_KEY, {
        expiresIn: '1d'
    });
}


exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, process.env.SALT_KEY);
    return data;
}


exports.authorize = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).send({
            message: 'Acesso Restrito'
        });

    } else {
        jwt.verify(token, process.env.SALT_KEY, (error, decoded) => {
            if (error)
                res.status(401).send({
                    message: 'Token Inválido'
                });
            else {
                next();
            }
        });
    }
}