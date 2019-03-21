'use strict'
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const customer = mongoose.model('Customer');
const ValidationContract = require('../validators/fluent-validators');
const repository = require('../repositories/customerRepository');
const authService = require('../services/authService');



exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

exports.getOne = async (req, res, next) => {
    try {
        var data = await repository.getOne(req.params.id);
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({
            message: 'Falha ao processar a sua requisição'
        });
    }
}

exports.authenticateUser = async (req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email
        });
        console.log(customer.password);
        bcrypt.compare(req.body.password, customer.password, async(err, result) => {
            if (err) {
                res.status(500).send({
                    message: 'Falha no encrypt'
                });
            } else {
                if (result == true) {
                    const token = await authService.generateToken({
                        id: customer._id,
                        email: customer.email,
                        name: customer.name,
                    });

                    res.status(201).send({
                        auth: true,
                        token: token
                    });
                } else {
                    res.status(404).send({
                        message: 'erro'
                    })
                }
            }
        })
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
    /*bcrypt.compare(req.body.password, encryptedPassword, (err, res)=>{
        if(err){
            console.log('error: ', err);
        }else{
        console.log(req.body.password,'\n', res, '\n');
        console.log(res);
        }
    })*/
}

exports.authenticateNewUser = async (req, res, next) => {
    //var hash = bcrypt.hashSync(req.body.password, 10);

    try {

        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                res.status(404).send({
                    message: 'ocorreu um erro ao gerar hash'
                });
            }
            let encryptedPassword = hash;
            const customer = await repository.authenticatenewUser({
                email: req.body.email
            });

            if (customer.length == 0) {
                /*res.status(404).send({
                    message: 'Usuário ou senha inválidos'
                });*/
                //return;
                const token = await authService.generateToken({
                    id: customer._id,
                    email: customer.email,
                    name: customer.name,
                });
                try {
                    await repository.cadastrar({
                        name: req.body.name,
                        email: req.body.email,
                        password: encryptedPassword,
                    });
                    res.status(201).send({
                        token: token,
                        data: {
                            email: req.body.email,
                            name: req.body.name,

                        },
                        //hash: hash
                    });
                } catch (error) {
                    res.status(500).send({
                        message: 'Falha ao processar sua requisição'
                    });
                }


            } else {
                res.status(404).send({
                    message: 'Email já cadastrado'
                });
            }

            /*const token = await authService.generateToken({
                email: customer.email,
                name: customer.name,
            });


            res.status(201).send({
                token: token,
                data: {
                    email: req.body.email,
                    name: req.body.name,

                },
                hash: hash
            });*/
        })


    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }




}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    //contract.hasMinLen(req.body.email, 3, 'O título deve conter no mínimo 3 caracteres');
    //contract.hasMaxLen(req.body.title, 20, 'O título deve ter no máximo 20 caracteres');
    contract.isEmail(req.body.email, 'O email não é válido');
    if (!contract.isValid()) {
        res.status(400).send(contract.errors());
    }

    try {

        await repository.create(req.body);
        res.status(201).send('Produto cadastrado com sucesso');
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: error
        });
    }
}

exports.update = async (req, res) => {
    let contract = new ValidationContract();
    //contract.hasMinLen(req.body.email, 3, 'O título deve conter no mínimo 3 caracteres');
    //contract.hasMaxLen(req.body.title, 20, 'O título deve ter no máximo 20 caracteres');
    contract.isEmail(req.body.email, 'O email não é válido');
    if (!contract.isValid()) {
        res.status(400).send(contract.errors());
    }

    try {
        await repository.update(req.params.id, req.body);
        res.status(201).send({
            message: 'dados atualizados com sucesso'
        })
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: error
        });
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id);
        res.status(200).send({
            message: 'dados removidos com sucesso'
        })
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: error
        });
    }
}