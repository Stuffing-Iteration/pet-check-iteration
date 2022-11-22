const path = require('path');
const db = require('../db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

const userController = {};

userController.createUser = (req, res, next) => {
    const { username, password, email } = req.body;
    const hashed = bcrypt.hashSync(password, SALT_ROUNDS);
    const addQ = 'INSERT INTO users(username, password, email) VALUES ($1, $2, $3);';
    const params = [username, hashed, email]
    db.query(addQ, params)
    .then((data) => {
      // TODO: This is janky, you should just do the insert with a return value
      return db.query('SELECT id FROM users WHERE username=$1', [username])
    })
    .then((data) => {
      res.locals = {
        username: username,
        userId: data.rows[0].id
      }
      next();
      return;
    })
    .catch((err) => {
      return next({msg: 'ERROR IN userController.createUser', err: err})
    });
}


userController.verifyUser = (req, res, next) => {
    //console.log('inside verifyUser');
    
    const { username, password } = req.body;
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


userController.createJWT = (req, res, next) => {
  // expect incoming res.locals to have username and userId
  const jbody = {
    issuedBy: 'pet-check',
    username: res.locals.username,
    userId: res.locals.userId
  }
  // Create JWT with 5min lifespan and send it back in a cookie for storage
  const thisJWT =  jwt.sign(jbody, process.env.TOKEN_SECRET, { expiresIn: '900s' } );
  res.cookie('token', thisJWT, {
    httpOnly: true,
    signed: true
  })
  next();
  return; 
}


userController.verifyJWT = (req, res, next) => {
  const token = req.signedCookies.token;
  jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
    if (err) {
      console.error(err)
      res.locals.verified = false
     } else {
      res.locals.verified = true;
      res.locals.username = data.username;
      res.locals.userId = data.userId;
    };
    next();
    return;
  });
}


userController.createRefreshToken = async (req, res, next) => {

}


userController.verifyRefreshToken = (req, res, next) => {

}



// ------ request body template for testing ------- //
// {
//   "username": "testuser1",
//   "password": "password",
//   "email": "email@email.com"
// }
// ----------------------------------------------- //

module.exports = userController;