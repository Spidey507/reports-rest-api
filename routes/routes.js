'use strict'

var express = require('express');
var UsersController = require('../controllers/users');

var router = express.Router();

// Rutas de prueba
router.get('/test-method', UsersController.test_method);

module.exports = router;
