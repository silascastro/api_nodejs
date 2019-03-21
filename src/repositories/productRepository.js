'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');


exports.get = async () => {
    const res = await Product
        .find({
            active: true
        }, 'title price slug');

    return res;
}


exports.getBySlug = async (slug) => {
    const res = await Product
        .findOne({
            slug: slug,
            active: true
        }, 'title price slug');
    return res;
}

exports.getById = async (id) => {
    const res = await Product.findById(id);
    return res;
}


exports.create = async(data) => {
    var product = new Product(data);
    await product.save();
}

exports.update = async (id, body) => {
    await Product.findByIdAndUpdate(id, body)
}


exports.delete = async (id) => {
    await Product
        .findByIdAndRemove(id)
}