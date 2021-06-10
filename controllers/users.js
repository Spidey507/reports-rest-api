'use strict'

var controller = {
  test_method: (req, res) => {
    return res.status(200).send({
      status: 200,
      message: "Success contact"
    });
  }
}

module.exports = controller;
