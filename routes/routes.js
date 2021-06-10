'use strict'

var express = require('express');
var UsersController = require('../controllers/users');

var router = express.Router();

router.get('/employees/all', UsersController.users_list);
router.get('/employees/:id', UsersController.find);

module.exports = router;
