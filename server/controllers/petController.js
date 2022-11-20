const db = require('../db.js');

const petController = {};

let petId = 1;
let medId = 1;
let vetId = 2;
let vaxId = 1;
let apptId = 1;

/////////////////////////////////////////////////////////////////////////////////////////
// ------------------------------- Adding Pet Info ----------------------------------- //
/////////////////////////////////////////////////////////////////////////////////////////

// ------------------------ Add a new Pet ------------------------ //
petController.addPet = (req, res, next) => {
  console.log('add pet req body: ', req.body);
  const { name, owner_id, species, breed, weight, color, age, vet_id } = req.body;
  const qText = 'INSERT INTO pets (id, name, owner_id, species, breed, weight, color, age, vet_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);';
  const params = [petId, name, owner_id, species, breed, weight, color, age, vet_id];
  db.query(qText, params)
    .then(result => {
      console.log('returned from db query: ', result)
      res.locals.petAdded = true;
      petId++;
      return next();
    })
    .catch(err => {
      return next({errorMsg: 'Problem in addPet middleware', err: err})
    })
}
// ----------------------------------------------------------------- //

// ------------------------ Add a new Vet ------------------------ //
petController.addVet = (req, res, next) => {
  console.log('add vet req body: ', req.body);
  const { vet, location, phone, clinic } = req.body;
  const qText = 'INSERT INTO vets (id, vet, location, phone, clinic) VALUES ($1, $2, $3, $4, $5);';
  const params = [vetId, vet, location, phone, clinic ];
  db.query(qText, params)
    .then(result => {
      console.log('returned from db query: ', result)
      vetId++;
      return next();
    })
    .catch(err => {
      return next({errorMsg: 'Problem in addVet middleware', err: err})
    })
}
// ----------------------------------------------------------------- //

// ------------------------ Add a new Vaccination ------------------------ //
petController.addVaccination = (req, res, next) => {
  console.log('add vax req body: ', req.body);
  const { vaccine, date, expiration, location, pet_id, vet_id } = req.body;
  const qText = 'INSERT INTO vaccinations (id, vaccine, date, expiration, location, pet_id, vet_id ) VALUES ($1, $2, $3, $4, $5, $6, $7);';
  const params = [vaxId, vaccine, date, expiration, location, pet_id, vet_id ];
  db.query(qText, params)
    .then(result => {
      console.log('returned from db query: ', result)
      vaxId++;
      return next();
    })
    .catch(err => {
      return next({errorMsg: 'Problem in addVaccination middleware', err: err})
    })
}
// ----------------------------------------------------------------- //


// ------------------------ Add a new Medication ------------------------ //
petController.addMedication = (req, res, next) => {
  console.log('add med req body: ', req.body);
  const { medication, dosage, instructions, pet_id, vet_id, reason } = req.body;
  const qText = 'INSERT INTO medications (id, medication, dosage, instructions, pet_id, vet_id, reason) VALUES ($1, $2, $3, $4, $5, $6, $7);';
  const params = [medId, medication, dosage, instructions, pet_id, vet_id, reason ];
  db.query(qText, params)
    .then(result => {
      console.log('returned from db query: ', result)
      medId++;
      return next();
    })
    .catch(err => {
      return next({errorMsg: 'Problem in addMedication middleware', err: err})
    })
}
// ----------------------------------------------------------------- //


// ------------------------ Add a new Appointment ------------------------ //
petController.addAppointment = (req, res, next) => {
  console.log('add appt req body: ', req.body);
  const { date, time, location, vet, pet_id, vet_id, reason } = req.body;
  const qText = 'INSERT INTO appointments (id, date, time, location, vet, pet_id, vet_id, reason) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);';
  const params = [apptId, date, time, location, vet, pet_id, vet_id, reason];
  db.query(qText, params)
    .then(result => {
      console.log('returned from db query: ', result)
      apptId++;
      return next();
    })
    .catch(err => {
      return next({errorMsg: 'Problem in addAppointment middleware', err: err})
    })
}
// ----------------------------------------------------------------- //


/////////////////////////////////////////////////////////////////////////////////////////
// ------------------------- Retrieving Pet Info Routes ------------------------------ //
/////////////////////////////////////////////////////////////////////////////////////////

petController.getUserPets = (req, res, next) => {
  console.log('GET user pets req body: ', req.body);
  console.log('req params for user pets: ', req.params);

}

petController.getPetMeds = (req, res, next) => {
  console.log('GET user meds req body: ', req.body);
  console.log('req params for pet meds: ', req.params);
}

petController.getPetAppointments = (req, res, next) => {
  console.log('GET user meds req body: ', req.body);
  console.log('req params for pet meds: ', req.params);
}

petController.getPetVaccinations = (req, res, next) => {
  console.log('GET user meds req body: ', req.body);
  console.log('req params for pet meds: ', req.params);
}
/*
// ------ request body templates for testing ------- //
////// --- Pets ---- ////////////
 {
  "name": "Fido",
  "owner_id": "1",
  "species": "dog",
  "breed": "lab",
  "weight": 50,
  "color": "black",
  "age": 7,

 }

 //// ----- Vets ---- //////
 {
  "vet": "Dr. Kim",
  "location": "123 Main Street, Los Angeles, CA 90048",
  "phone": 555-555-5555,
  "clinic": "Super Duper Animal Hospital"
 }

// ---- Vaccinations --- //
{
  "vaccine": "rabies",
  "date": "10/12/22",
  "expiration": "10/12/25",
  "location": ?
  "pet_id": 1,
  "vet_id": 1
}

// ---- Medication ----- //
{
  "medication": "flexinil",
  "dosage": "5 mg",
  "instructions": "2/day for 5 days",
  "pet_id": 1,
  "vet_id": 1,
  "reason": "migraines"
}

// ----- Appointment ----- ///
{
  "date": "1/22/23",
  "time": "1:30",
  "location": "",
  "vet": "",
  "pet_id": 1, 
  "vet_id": 1,
  reason: "check-up"
}
// ----------------------------------------------- //
*/

module.exports = petController;