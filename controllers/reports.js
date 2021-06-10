'use strict'

const { pool } = require('../config')

var controller = {
  all: (req, res) => {
    pool.query('select * from reports join employees on reports.employee_id = employees.id;', (error, results) => {
      if (error) {
        //throw error
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
      return res.status(500).send({
        status: 'error',
        message: 'Error con la peticion en la base de datos.',
        error: err
      });
    })
    if (reports_response.rowCount == 0) {
      return res.status(404).send({
        status: 'error',
        message: 'Reporte no existe.'
      });
    }
    let report = reports_response.rows[0]

    let employee_response = await (pool.query('SELECT * FROM employees where id = $1', [report.employee_id])).catch((err) => {
      return res.status(500).send({
        status: 'error',
        message: 'Error con la peticion en la base de datos.',
        error: err
      });
    })
    let employee = employee_response.rows[0]
    report.employee = employee

    let transactions_response = await (pool.query('SELECT * FROM transaction_records where transaction_record_id = $1', [report.id])).catch((err) => {
      return res.status(500).send({
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
  }
}

module.exports = controller;
