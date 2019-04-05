'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validators')
const repository = require('../repositories/productRepository')

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}


exports.getBySlug = (req, res, next) => {

    try {
        var data = repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter no mínimo 3 caracteres');
    contract.hasMaxLen(req.body.title, 20, 'O título deve ter no máximo 20 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors());
    }

    console.log(req.file.path);

    try {
        await repository.create({
            title: req.body.title,
            productImage: req.file.path,
            description: req.body.description,
            price: req.body.price,
        });
        res.status(201).send('Produto cadastrado com sucesso');
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: error
        })
    }

}

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id,req.body);
        res.status(201).send('Produto atualizado com sucesso');
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: error
        })
    }
}

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.params.id);
        res.status(201).send('Produto exluído com sucesso');
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: error
        })
    }
}