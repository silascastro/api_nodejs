'use strict'


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: [true, 'title é requerido'],
        trim: true
    },
    slug: {
        type: String,
        required: [false, 'slug é requerido'],
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'description é requerido'],
        trim: true
    },
    productImage: {
        type: String,
        required: [true, 'imagem do produto é requerida']
    },
    price: {
        type: Number,
        required: [true, 'price é requerido'],
    },
    active: {
        type: Boolean,
        required: [true, 'active é requerido'],
        default: true
    },
    tags: [
        {
            type: String,
            required: [true, 'tags é requerido'],
        }
    ]
});



module.exports = mongoose.model('Product', schema);
