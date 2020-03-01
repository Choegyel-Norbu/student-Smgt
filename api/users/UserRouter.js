var express = require('express');
var router = express.Router();
var {createUser, getUser, userLoginAuth} = require('./UserController');
const {genSaltSync, hashSync, compareSync} = require('bcrypt');
var db = require('./../../db-connection/connection')

router.post('/', createUser);
// router.get('/', getUser)

router.get('/', function (req, res, next) {
  db.query("SELECT *from Users", (err, row, fields) => {
    if (!err)
      res.json(row);
    else
      res.json(err);
  });
});

router.post('/login', userLoginAuth);

module.exports = router
