'use strict'

const { pool } = require('../config')

var controller = {
  all: (req, res) => {
    pool.query('select reports.id, reports.concepto, employees.nombre, employees.departamento, employees.supervisor from reports join employees on reports.employee_id = employees.id;', (error, results) => {
      if (error) {
        console.log(error)
        res.status(500).send({
          message: 'Ya fue hubo un error',
          error: error
        });
      } else {
        res.status(200).json(results.rows)
      }
    })

  },
  find: async (req, res) => {
    var report_id = req.params.id
    if (!report_id || report_id == null) {
      return res.status(404).send({
        status: 'error',
        message: 'No has enviado el id del reporte.'
      });
    }
    let reports_response = await (pool.query('SELECT * FROM reports where id = $1', [report_id])).catch((err) => {
      console.log(err)
      return res.status(500).send({
        status: 'error',
        message: 'Error con la peticion en la base de datos.',
        error: err
      });
    })
    if (reports_response.rowCount == 0) {
      console.log(reports_response)
      return res.status(404).send({
        status: 'error',
        message: 'Reporte no existe.'
      });
    }
    let report = reports_response.rows[0]

    let employee_response = await (pool.query('SELECT * FROM employees where id = $1', [report.employee_id])).catch((err) => {
      console.log(err)
      return res.status(500).send({
        status: 'error',
        message: 'Error con la peticion en la base de datos.',
        error: err
      });
    })
    let employee = employee_response.rows[0]
    report.employee = employee

    let transactions_response = await (pool.query('SELECT * FROM transaction_records where report_id = $1;', [report.id])).catch((err) => {
      console.log(err)
      return res.status(500).send({
        report_id: report.id,
        status: 'error',
        message: 'Error con la peticion en la base de datos.',
        error: err
      });
    })

    if (transactions_response.rowCount == 0) {
      report.transactions = []
      return res.status(200).json(report);
    }
    report.transactions = transactions_response.rows
    return res.status(200).json(report);
  },
  create: async (req, res) => {
    const params = req.body;
    let employee_params = params.employee
    let employee_response = await (pool.query("SELECT id FROM employees where nombre ilike $1;", [employee_params.nombre])).catch((err) => {
      console.log(err)
      return res.status(500).send({
        status: 'error',
        message: 'Error con la peticion en la base de datos.',
        error: err
      })
    })

    if (employee_response.rowCount == 0) {
      employee_response = await (pool.query("INSERT INTO employees (nombre, posicion, departamento, supervisor) VALUES  ($1,$2,$3,$4) returning id", [employee_params.nombre, employee_params.posicion, employee_params.departamento, employee_params.supervisor])).catch((err) => {
        console.log(err)
        return res.status(500).send({
          status: 'error',
          message: 'Error con la peticion en la base de datos.',
          error: err
        })
      })
    }

    let employee_id = employee_response.rows[0].id

    let report_response = await (pool.query("INSERT INTO reports (employee_id, concepto, fecha_desde, fecha_hasta, aprobado_por, firma) VALUES  ($1,$2,$3,$4,$5,$6) returning id", [employee_id, params.concepto, params.fecha_desde, params.fecha_hasta, params.aprobado_por, params.firma])).catch((err) => {
      console.log(err)
      return res.status(500).send({
        status: 'error',
        message: 'Error con la creacion del reporte en la base de datos.',
        error: err
      })
    })

    let report_id = report_response.rows[0].id

    let transactions = params.transactions

    transactions.forEach(async function (transaction) {
      let transaction_response = await(pool.query("INSERT INTO transaction_records (report_id, fecha, cuenta, descripcion, total) VALUES  ($1,$2,$3,$4,$5) returning id", [report_id, transaction.fecha, transaction.cuenta, transaction.descripcion, transaction.total])).catch((err) => {
        console.log(err)
        return res.status(500).send({
          status: 'error',
          message: 'Error con la creacion del reporte en la base de datos.',
          error: err
        })
      })
      console.log(transaction_response.rows[0].id)
    })

    return res.status(201).send({
      status: '201',
      message: 'created'
    })
  }
}

module.exports = controller;
