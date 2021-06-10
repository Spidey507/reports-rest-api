'use strict'

const { pool } = require('../config')

var controller = {
  users_list: (req, res) => {
    pool.query('SELECT * FROM employees;', (error, results) => {
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

  }
}

module.exports = controller;
