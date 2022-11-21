const path = require('path');
const db = require('../db.js');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(12);

const userController = {};
// const SALT_ROUNDS = 12;
let idNum = 1;

userController.createUser = (req, res, next) => {
    console.log('inside userController.creatUser');
    const { username, password, email } = req.body;
    // console.log('req.body', req.body);
    // let hashedPw;
    // bcrypt.hashSync(password, SALT_ROUNDS, (err, hash) => {
    //   hashedPw = hash;
    //   console.log('bcrypt hashed pw', hashedPw);
    // });
    const hashed = bcrypt.hashSync(password, salt);
    // console.log('hashedpassword', hashedPw);
    const addQ = 'INSERT INTO users(id, username, password, email) VALUES ($1, $2, $3, $4);';
    const params = [idNum, username, hashed, email]
    db.query(addQ, params)
        .then(() => {
          idNum++;
          return next();
        })
        .catch((err) => {return next({msg: 'ERROR IN userController.createUser', err: err})});
}


userController.verifyUser = (req, res, next) => {
    console.log('inside verifyUser');
    const { username, password } = req.body;
    const hashed = bcrypt.hashSync(password, salt);
    // if (bcrypt.compareSync(, hashed));

    const verifyQ = 'SELECT * FROM users WHERE username = $1;';
    const params = [username];

    db.query(verifyQ, params)
      .then((user) => {
        console.log('db result', user);
        if (user.rows.length) {
          if (bcrypt.compareSync(password, user.rows[0].password)) {
            res.locals.user = user.rows[0]; // send back the whole user object on the response, in case the frontend needs the id/email
            res.locals.found = true;
            return next();
          } else {
            res.locals.found = false;
            return next({msg: 'No user found with that username'})
          }
        } else {
          return next({errorMsg: 'No user found with that username!'})
        }
      })
      .catch((err => {return next({msg: 'ERROR IN userController.verifyUser', err: err})}));
}

// ------ request body template for testing ------- //
// {
//   "username": "testuser1",
//   "password": "password",
//   "email": "email@email.com"
// }
// ----------------------------------------------- //

module.exports = userController;