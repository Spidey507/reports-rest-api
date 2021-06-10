'use strict'

var express = require('express');
var UsersController = require('../controllers/users');
var ReportsController = require('../controllers/reports');

var router = express.Router();

router.get('/employees/all', UsersController.users_list);
router.get('/employees/:id', UsersController.find);
router.get('/reports/all', ReportsController.all);
router.get('/reports/:id', ReportsController.find);

module.exports = router;
