'use strict'

var express = require('express');
var UsersController = require('../controllers/users');

var router = express.Router();

router.get('/users/all', UsersController.users_list);

module.exports = router;
