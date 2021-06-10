'use strict'

//cargar modulos de node para crear servidor
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

//ejecutar express
const app = express()

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//CORS
app.use(cors())


module.exports = app;
