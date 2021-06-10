'use strict'

//cargar modulos de node para crear servidor
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')
const app_routes = require('./routes/routes')

//ejecutar express
const app = express()

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//CORS
app.use(cors())

// Añadir prefijos a rutas / Cargar rutas
app.use('/api', app_routes);

module.exports = app;
