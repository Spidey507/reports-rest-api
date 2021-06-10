'use strict'

var express = require('express');
var UsersController = require('../controllers/users');

var router = express.Router();

router.get('/users/all', UsersController.users_list);
router.get('/user/:id', UsersController.find);

module.exports = router;
