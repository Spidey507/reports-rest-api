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

  },
  find: (req, res) => {
    var user_id = req.params.id
    if (!user_id || user_id == null) {
      return res.status(404).send({
        status: 'error',
        message: 'No has enviado el id del usuario.'
      });
    }
    pool.query('SELECT * FROM employees where id = $1',
      [user_id], (error, results) => {
      if (error) {
        //throw error
        res.status(500).send({
          message: 'Ya fue hubo un error',
          error: error
        });
      } else {
        var users = results.rows
        if (users.length == 0) {
          res.status(404).send({
            status: 404,
            message: 'El usuario solicitado no existe.'
          });
        } else {
          res.status(200).json(users[0])
        }
      }
    })

  }
}

module.exports = controller;
