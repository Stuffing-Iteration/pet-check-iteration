const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();

// middleware
const userController = require('./controllers/userController.js');
const petController = require('./controllers/petController.js');

app.use(express.static(path.resolve(__dirname, '../client')));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.static(path.resolve(__dirname, '/client')));

app.get('/', (req, res) => {
  res.status(200).send('Hello from the back-end')
  
});

// Adding new users to the DB
app.post('/users', userController.createUser, (req, res) => {
  res.status(200).send('user added');
})

// Signing in existing users
app.post('/login', userController.verifyUser, (req, res) => {
  res.status(200).send('Logged in');
})


// ERROR HANDLERS:
// local
app.use('*', (req, res) => {
  res.status(404).send('404: Not Found');
});
// global 
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(3000, () => console.log('Server listening on port 3000'));


