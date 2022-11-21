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


//////////////////////////////////////////////////////////////////////////////////////
// ------------------------------ User Routes ------------------------------------ //
//////////////////////////////////////////////////////////////////////////////////////

// Adding new users to the DB
app.post('/users', userController.createUser, (req, res) => {
  res.status(200).send('user added');
})

// Signing in existing users
app.post('/login', userController.verifyUser, (req, res) => {
  const response = {
    user: res.locals.user,
    found: res.locals.found
  }
  res.status(200).json(response);
})


/////////////////////////////////////////////////////////////////////////////////////////
// -------------------------- Adding Pet Info Routes --------------------------------- //
/////////////////////////////////////////////////////////////////////////////////////////

// Add a new pet
app.post('/pets', petController.addPet, (req, res) => {
  res.status(200).send('New pet added!')
})

// Add a new veterinarian
app.post('/vets', petController.addVet, (req, res) => {
  res.status(200).send('New veterinarian added!')
})

// Add a new medication
app.post('/meds', petController.addMedication, (req, res) => {
  res.status(200).send('New medication added!')
})

// Add a new appointment
app.post('/appts', petController.addAppointment, (req, res) => {
  res.status(200).send('New appointment added!')
})

// Add a new vaccination
app.post('/vax', petController.addVaccination, (req, res) => {
  res.status(200).send('New vaccination added!')
})


/////////////////////////////////////////////////////////////////////////////////////////
// ------------------------- Retrieving Pet Info Routes ------------------------------ //
/////////////////////////////////////////////////////////////////////////////////////////

// ---- Get all of a users pets --- //
app.get('/pets/:userid', petController.getUserPets, (req, res) => {
  res.status(200).json(res.locals.retrievedPets);
})

// ----- Get all of a users veterinarians -----//
app.get('/vets/:userid', petController.getUserVets, (req, res) => {
  res.status(200).json(res.locals.retrievedVets);
})


// --- Get all of a pet's medications ---- //
app.get('/meds/:petid', petController.getPetMedications, (req, res) => {
  res.status(200).json(res.locals.retrievedMeds);
})

// ------ Get all of a pet's vaccinations ------ //
app.get('/vax/:petid', petController.getPetVaccinations, (req, res) => {
  res.status(200).json(res.locals.retrievedVax);
})

// ------ Get all of a pet's appointments ---- //
app.get('/appts/:petid', petController.getPetAppointments, (req, res) => {
  res.status(200).json(res.locals.retrievedAppts);
})

/////////////////////////////////////////////////////////////////////////////////////////
// -------------------------- Deleting Pet Documents  -------------------------------- //
/////////////////////////////////////////////////////////////////////////////////////////

// do we need to speciiy the route to a specific appointment/medication/vaccination??

app.delete('/appts/:petid', (req, res) => {
  res.status(200).send('Appointment removed!');
});

app.delete('/vax/:petid', (req, res) => {
  res.status(200).send('Vaccination removed!');
});


app.delete('/meds/:petid', (req, res) => {
  res.status(200).send('Medication removed!');
});


/////////////////////////////////////////////////////////////////////////////////////////
// -------------------------- Global Routes/Handlers -------------------------------- //
/////////////////////////////////////////////////////////////////////////////////////////

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


