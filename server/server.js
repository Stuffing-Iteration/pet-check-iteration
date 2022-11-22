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
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
  return;
})


//////////////////////////////////////////////////////////////////////////////////////
// ------------------------------ User Routes ------------------------------------ //
//////////////////////////////////////////////////////////////////////////////////////

// Adding new users to the DB
app.post('/api/users', userController.createUser, (req, res) => {
  res.status(200).json({ userId: res.locals.userId});
})

// Signing in existing users
app.post('/api/login', userController.verifyUser, (req, res) => {
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

//Add a new weight
app.post('/api/weights', petController.addWeights, (req, res) => {
  res.status(200).send('New weight added!')
})

///////////////////////////////////////////////////////////////////////////////////////
// ------------------------- Updating Pet Info Routes ------------------------------ //
///////////////////////////////////////////////////////////////////////////////////////

app.put('/pets/:petid', petController.updatePet, (req, res) => {
  res.status(200).send('Pet successfully updated')
})

app.put('/meds/:medid', petController.updateMedication, (req, res) => {
  res.status(200).send('Medication successfully updated')
})

app.put('/vax/:vaxid', petController.updateVaccine, (req, res) => {
  res.status(200).send('Vaccination successfully updated')
})

app.put('/appts/:apptid', petController.updateAppointment, (req, res) => {
  res.status(200).send('Appointment successfully updated')
})

app.put('/vets/:vetid', petController.updateVet, (req, res) => {
  res.status(200).send('Vet successfully updated')
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

// ERROR HANDLERS:
// local
app.use('*', (req, res) => {
  console.log('Default route handler for:\n' + `${req.method} request to ${req.url}`)
  res.status(404).send('404: Not Found');
});
// global 
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(3000, () => console.log('Server listening on port 3000'));


