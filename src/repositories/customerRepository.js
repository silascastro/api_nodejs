'use strict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');


exports.get = async () => {
    const res = await Customer.find();
    return res;
}

exports.getOne = async (id) => {
    const res = await Customer.findById(id);
    return res;
}


exports.cadastrar = async(data) => {
    var customer = new Customer(data);
    await customer.save();
}


exports.authenticate = async(data) => {
   // const customer = new Customer(data);
   // await customer.save();
   const res =  await Customer.findOne({
       email: data.email
   });
   //console.log(res);
   return res;  
}

exports.authenticatenewUser = async(data) => {
    // const customer = new Customer(data);
    // await customer.save();
    const res =  await Customer.find({
        email: data.email
    });
    //console.log(res);
    return res;  
 }

exports.update = async (id, body) => {
    await Customer.findOneAndReplace(id, body);
}


exports.delete = async(id) => {
    await Customer.findByIdAndDeleted(id);
}

/*exports.getById = async (id) => {
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
}*/