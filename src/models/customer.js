'use strict'


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    name: {
        type: String,
        required: [true, 'name é requerido'],
    },
    email: {
        type: String,
        required: [true, 'slug é requerido'],
    },
    password: {
        type: String,
        required: [true, 'slug é requerido'],
    }

})

module.exports = mongoose.model('Customer', schema);