const db = require('./../../db-connection/connection')

module.exports = {
  userindex: callback => {
    db.query('SELECT name, email, phone, std_id FROM Users'),
      [],
      (error, result, fields) => {
        console.log('result == ' +result);
        if(error)
          return callback(error)
        return callback(error, result)
      }
  },

  create: (params, callback) => {
    db.query(`INSERT INTO Users(email, password, phone, name, std_id) VALUES(?, ?, ?, ?, ?)`,
      [
        params.email,
        params.password,
        params.phone,
        params.name,
        params.std_id
      ],

      (error, results, fields) => {
        if (!error)
          return callback(error, results);
        else
          return callback(error);
      });
  },

  userAuth: (params, callback) => {
    console.log('email = ' + params.email );
    db.query(`SELECT * FROM Users WHERE email = ?`,[params.email],
      (error, result, fields) => {
        if(!error) {
          return callback(error, result[0])
        }
        else
          return callback(error)
      });
  }
}
