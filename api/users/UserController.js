const {create, userindex, userAuth} = require('./UserServices');
const {genSaltSync, hashSync, compareSync} = require('bcrypt');
const {sign} = require('jsonwebtoken');

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt)
    console.log(body.password)
    create(body, (error, result) => {
      if (!error) {
        return res.json({message: 'Success'});
      }
      return res.json({message: error});
    });
  },

  getUser: (req, res) => {
    userindex((error, result) => {
      if (!error) {
        return res.json({
          success: 1,
          data: result
        });
      }
      console.log(error)
      return res.json({
        success: 0,
        error: error
      });
    });
  },

  userLoginAuth: (req, res) => {
    const body = req.body;
    userAuth(body, (error, results) => {
      if (error)
        console.log(error);

      if (!results) {
        return res.json({
          success: 0,
          error: 'There is no such email'
        })
      }

      const result = compareSync(body.password, results.password);
      if(result) {
        results.password = undefined;
        const jsontoken = sign({result: results}, 'choegyel123', {
          expiresIn: '1h'
        });
        return res.json({
          success: 1,
          message: 'Login successful',
          token: jsontoken
        })
      }
      return res.json({
        success: 0,
        error: 'The password is incorrect'
      });
    });
  }
}