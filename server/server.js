const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const app = express();

// middleware
const userController = require('./controllers/userController.js');
const petController = require('./controllers/petController.js');

app.use(express.static(path.resolve(__dirname, '../client')));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
  return;
})

// Serve static files
app.use(express.static(path.resolve(__dirname, '../public')));

//////////////////////////////////////////////////////////////////////////////////////
// --------------------------- Auto Login Endpoint ------------------------------- //
//////////////////////////////////////////////////////////////////////////////////////
app.get('/api/login', userController.verifyJWT, (req, res) => {
  if (res.locals.verified) {
    // If verified, return the app to the page without modifying their URL
    res.status(200).json({redirectURL: '/pets/' + res.locals.userId});
  } else {
    res.status(500).json({redirectURL: '/'});
  }
})


//////////////////////////////////////////////////////////////////////////////////////
// ------------------------- Authorized Pages Gets ------------------------------ //
//////////////////////////////////////////////////////////////////////////////////////
app.get('/pets/*', userController.verifyJWT, (req, res) => {
  if (res.locals.verified) {
    // If verified, return the app to the page without modifying their URL
    res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
  } else {
    res.redirect('/')
  }
})


app.get('/petprofile/*', userController.verifyJWT, (req, res) => {
  if (res.locals.verified) {
    // If verified, return the app to the page without modifying their URL
    res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
  } else {
    res.redirect('/')
  }
})

//////////////////////////////////////////////////////////////////////////////////////
// ------------------------------ User Routes ------------------------------------ //
//////////////////////////////////////////////////////////////////////////////////////

// Adding new users to the DB
app.post('/api/users', userController.createUser, userController.createJWT, (req, res) => {
  res.status(200).json(res.locals);
})

// Signing in existing users
app.post('/api/login', userController.verifyUser, userController.createJWT, (req, res) => {
  res.status(200).json(res.locals);
})


/////////////////////////////////////////////////////////////////////////////////////////
// -------------------------- Adding Pet Info Routes --------------------------------- //
/////////////////////////////////////////////////////////////////////////////////////////

// Add a new pet
app.post('/api/pets', petController.addPet, (req, res) => {
  res.status(200).send('New pet added!')
})

// Add a new veterinarian
app.post('/api/vets', petController.addVet, (req, res) => {
  res.status(200).send('New veterinarian added!')
})

// Add a new medication
app.post('/api/meds', petController.addMedication, (req, res) => {
  res.status(200).send('New medication added!')
})

// Add a new appointment
app.post('/api/appts', petController.addAppointment, (req, res) => {
  res.status(200).send('New appointment added!')
})

// Add a new vaccination
app.post('/api/vax', petController.addVaccination, (req, res) => {
  res.status(200).send('New vaccination added!')
})


/////////////////////////////////////////////////////////////////////////////////////////
// ------------------------- Retrieving Pet Info Routes ------------------------------ //
/////////////////////////////////////////////////////////////////////////////////////////

// ---- Get all of a users pets --- //
app.get('/api/pets/:userid', petController.getUserPets, (req, res) => {
  res.status(200).json(res.locals.retrievedPets);
})

// ----- Get all of a users veterinarians -----//
app.get('/api/vets/:userid', petController.getUserVets, (req, res) => {
  res.status(200).json(res.locals.retrievedVets);
})


// --- Get all of a pet's medications ---- //
app.get('/api/meds/:petid', petController.getPetMedications, (req, res) => {
  res.status(200).json(res.locals.retrievedMeds);
})

// ------ Get all of a pet's vaccinations ------ //
app.get('/api/vax/:petid', petController.getPetVaccinations, (req, res) => {
  res.status(200).json(res.locals.retrievedVax);
})

// ------ Get all of a pet's appointments ---- //
app.get('/api/appts/:petid', petController.getPetAppointments, (req, res) => {
  res.status(200).json(res.locals.retrievedAppts);
})

/////////////////////////////////////////////////////////////////////////////////////////
// -------------------------- Deleting Pet Documents  -------------------------------- //
/////////////////////////////////////////////////////////////////////////////////////////

// do we need to speciiy the route to a specific appointment/medication/vaccination??

app.delete('/api/appts/:apptid', petController.deleteAppointment, (req, res) => {
  res.status(200).send('Appointment removed!');
});

app.delete('/api/vax/:vaxid', (req, res) => {
  res.status(200).send('Vaccination removed!');
});


app.delete('/api/meds/:medid', (req, res) => {
  res.status(200).send('Medication removed!');
});


/////////////////////////////////////////////////////////////////////////////////////////
// -------------------------- Global Routes/Handlers -------------------------------- //
/////////////////////////////////////////////////////////////////////////////////////////

// Send unrecognized get requests to index.html and let front end display appropriately
app.get('/*', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
  return;
})

// Send return 404 for all unrecognized non-get requests
app.use('/*', (req, res) => {
  console.log('Default route handler for:\n' + `${req.method} request to ${req.url}`)
  res.status(404).send('404: Not Found');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(3000, () => console.log('Server listening on port 3000'));


