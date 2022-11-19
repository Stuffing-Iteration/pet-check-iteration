const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');


const app = express();

app.use(express.static(path.resolve(__dirname, '../client')));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());






app.get('/', (req, res) => {
  res.status(200).send('Hello from the back end!')
});




app.listen(3000, () => console.log('Server listening on port 3000'));


