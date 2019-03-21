'use strict'
const express = require('express');
const dotenv = require('dotenv');

const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('../src/config');

//connecta ao banco
mongoose.connect(config.connectionString, { useCreateIndex: true,useNewUrlParser: true });
mongoose.connection.on('error',function (){
    console.log('Falha ao conectar com o Banco de dados'),
    process.exit(1)
});


//carrega os models
const Product = require('./models/product');
const Customer = require('./models/customer');

//carrega as Rotas
const index = require('./routes/index');
const product = require('./routes/product');
const customer = require('./routes/customer');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


//app.use('/', index);
app.use('/',index);
app.use('/products', product);
app.use('/customers',customer);

module.exports = app;