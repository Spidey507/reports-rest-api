const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const getEmployees = (request, response) => {
  pool.query('SELECT * FROM employees', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addEmployee = (request, response) => {
  const { nombre, posicion, departamento, supervisor } = request.body
  console.log({ nombre, posicion, departamento, supervisor });

  pool.query(
    'INSERT INTO Employees (nombre, posicion, departamento, supervisor) VALUES ($1, $2, $3, $4)',
    [nombre, posicion, departamento, supervisor],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'Employee added.' })
    },
  )
}

app
  .route('/employees')
  // GET endpoint
  .get(getEmployees)
  // POST endpoint
  .post(addEmployee)

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})
