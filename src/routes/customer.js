'use strict'
const express = require('express');
const router = express.Router();
const controller = require('../controllers/customerController');
const jwt = require('../services/authService');

//router.get('/',controller.get);
//router.post('/',controller.newUser);
router.post('/signIn', controller.authenticateNewUser);
router.post('/login',controller.authenticateUser);
//router.get('/:id',controller.getOne);
//router.put('/:id',controller.update);
//router.delete('/:id',controller.delete);

module.exports = router;
