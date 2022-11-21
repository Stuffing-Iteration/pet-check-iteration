const db = require('../db.js');

const petController = {};

let petId = 1;
let medId = 1;
let vetId = 3;
let vaxId = 2;
let apptId = 2;

/////////////////////////////////////////////////////////////////////////////////////////
// ------------------------------- Adding Pet Info ----------------------------------- //
/////////////////////////////////////////////////////////////////////////////////////////

// ------------------------ Add a new Pet ------------------------ //
petController.addPet = (req, res, next) => {
  console.log('add pet req body: ', req.body);
  const { name, owner_id, species, breed, weight, color, age, vet_id } =
    req.body;
  const qText =
    'INSERT INTO pets (id, name, owner_id, species, breed, weight, color, age, vet_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);';
  const params = [
    petId,
    name,
    owner_id,
    species,
    breed,
    weight,
    color,
    age,
    vet_id,
  ];
  db.query(qText, params)
    .then((result) => {
      console.log('returned from db query: ', result);
      res.locals.petAdded = true;
      petId++;
      return next();
    })
    .catch((err) => {
      return next({ errorMsg: 'Problem in addPet middleware', err: err });
    });
};
// ----------------------------------------------------------------- //

// ------------------------ Add a new Vet ------------------------ //
petController.addVet = (req, res, next) => {
  console.log('add vet req body: ', req.body);
  const { vet, location, phone, clinic, user_id } = req.body;
  const qText =
    'INSERT INTO vets (id, vet, location, phone, clinic, user_id) VALUES ($1, $2, $3, $4, $5, $6);';
  const params = [vetId, vet, location, phone, clinic, user_id];
  db.query(qText, params)
    .then((result) => {
      console.log('returned from db query: ', result);
      vetId++;
      return next();
    })
    .catch((err) => {
      return next({ errorMsg: 'Problem in addVet middleware', err: err });
    });
};
// ----------------------------------------------------------------- //

// ------------------------ Add a new Vaccination ------------------------ //
petController.addVaccination = (req, res, next) => {
  console.log('add vax req body: ', req.body);
  const { vaccine, date, expiration, location, pet_id, vet_id } = req.body;
  const qText =
    'INSERT INTO vaccinations (id, vaccine, date, expiration, location, pet_id, vet_id ) VALUES ($1, $2, $3, $4, $5, $6, $7);';
  const params = [vaxId, vaccine, date, expiration, location, pet_id, vet_id];
  db.query(qText, params)
    .then((result) => {
      console.log('returned from db query: ', result);
      vaxId++;
      return next();
    })
    .catch((err) => {
      return next({
        errorMsg: 'Problem in addVaccination middleware',
        err: err,
      });
    });
};
// ----------------------------------------------------------------- //

// ------------------------ Add a new Medication ------------------------ //
petController.addMedication = (req, res, next) => {
  console.log('add med req body: ', req.body);
  const { medication, dosage, instructions, pet_id, vet_id, reason } = req.body;
  const qText =
    'INSERT INTO medications (id, medication, dosage, instructions, pet_id, vet_id, reason) VALUES ($1, $2, $3, $4, $5, $6, $7);';
  const params = [
    medId,
    medication,
    dosage,
    instructions,
    pet_id,
    vet_id,
    reason,
  ];
  db.query(qText, params)
    .then((result) => {
      console.log('returned from db query: ', result);
      medId++;
      return next();
    })
    .catch((err) => {
      return next({
        errorMsg: 'Problem in addMedication middleware',
        err: err,
      });
    });
};
// ----------------------------------------------------------------- //

// ------------------------ Add a new Appointment ------------------------ //
petController.addAppointment = (req, res, next) => {
  console.log('add appt req body: ', req.body);
  const { date, time, location, vet, pet_id, vet_id, reason } = req.body;
  const qText =
    'INSERT INTO appointments (id, date, time, location, vet, pet_id, vet_id, reason) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);';
  const params = [apptId, date, time, location, vet, pet_id, vet_id, reason];
  db.query(qText, params)
    .then((result) => {
      console.log('returned from db query: ', result);
      apptId++;
      return next();
    })
    .catch((err) => {
      return next({
        errorMsg: 'Problem in addAppointment middleware',
        err: err,
      });
    });
};
// ----------------------------------------------------------------- //

/////////////////////////////////////////////////////////////////////////////////////////
// ------------------------- Retrieving Pet Info Routes ------------------------------ //
/////////////////////////////////////////////////////////////////////////////////////////

// ---- Get all of a users pets --- //
petController.getUserPets = (req, res, next) => {
  console.log('GET user pets req body: ', req.body);
  console.log('req params for user pets: ', req.params);
  // query the database for all the pets with a user_id that matches the id in req.params
  const { userid } = req.params;
  const qText = 'SELECT * FROM pets WHERE owner_id = $1'; // get all the pets with a owner_id that matches
  const params = [userid];
  db.query(qText, params)
    .then((pets) => {
      console.log('retrieved pets: ', pets.rows);
      res.locals.retrievedPets = pets.rows; // add the array of pets to res.locals to send back to front end
      return next();
    })
    .catch((err) =>
      next({ errorMsg: 'Error in getUserPets middleware', err: err })
    );
};

// --- Get all of a pet's medications ---- //
petController.getPetMedications = (req, res, next) => {
  console.log('GET pet meds req body: ', req.body);
  console.log('req params for pet meds: ', req.params);

  const { petid } = req.params;
  const qText = 'SELECT * FROM medications WHERE pet_id = $1'; // get all the meds with a pet_id that matches
  const params = [petid];
  db.query(qText, params)
    .then((meds) => {
      console.log('retrieved meds: ', meds.rows);
      res.locals.retrievedMeds = meds.rows; // add the array of pets to res.locals to send back to front end
      return next();
    })
    .catch((err) =>
      next({ errorMsg: 'Error in getPetMedications middleware', err: err })
    );
};

// ------ Get all of a pet's appointments ------ //
petController.getPetAppointments = (req, res, next) => {
  console.log('GET all appointments req body: ', req.body);
  const { petid } = req.params;
  const qAppmnt = 'SELECT * FROM appointments WHERE pet_id = $1';
  const params = [petid];
  db.query(qAppmnt, params)
    .then((appointment) => {
      console.log('retrieved appointments: ', appointment.rows);
      res.locals.retrievedAppts = appointment.rows; // array of appointments to be sent back to front end
      return next();
    })
    .catch((err) =>
      next({
        errorMsg: 'Error in petController.getPetAppointments: ',
        err: err,
      })
    );
};

// ------ Get all of a pet's vaccinations ------ //
petController.getPetVaccinations = (req, res, next) => {
  console.log('GET all vaccinations req body: ', req.body);
  const { petid } = req.params;
  const qVax = 'SELECT * FROM vaccinations WHERE pet_id = $1';
  const params = [petid];
  db.query(qVax, params)
    .then((vaccination) => {
      console.log('retrieved vaccinations: ', vaccination.rows);
      res.locals.retrievedVax = vaccination.rows;
      return next();
    })
    .catch((err) =>
      next({
        errorMsg: 'Error in petController.getPetVaccinations: ',
        err: err,
      })
    );
};

// ------ Get all of a user's veterinarians ------ //
petController.getUserVets = (req, res, next) => {
  const { userid } = req.params;
  console.log('vet params', req.params);
  const qText = 'SELECT * FROM vets WHERE user_id = $1'; // get all the vets with a user_id that matches
  const params = [userid];
  db.query(qText, params)
    .then((vets) => {
      console.log('retrieved vets: ', vets.rows);
      res.locals.retrievedVets = vets.rows; // add the vets to res.locals to send back to frontend
      return next();
    })
    .catch((err) =>
      next({ errorMsg: 'Error in getUserVets middleware', err: err })
    );
};

// ------ Deleting an appointment ------ //
petController.deleteAppointment = (req, res, next) => {
  console.log('inside petController.deleteAppointment');
  const { apptId } = req.body;
  const params = [apptId];
  const deleteQ = 'DELETE FROM appointments WHERE id = $1';
  db.query(deleteQ, params)
    .then(() => {
      return next();
    })
    .catch((err) =>
      next({ errorMsg: 'Error in petController.deleteAppointment: ', err: err })
    );
};

// ------ Deleting a vaccination ------ //
petController.deleteVax = (req, res, next) => {
  console.log('inside petController.deleteVax');
  const { vaxId } = req.body;
  const params = [vaxId];
  const deleteQ = 'DELETE FROM vaccinations WHERE id = $1';
  db.query(deleteQ, params)
    .then(() => {
      return next();
    })
    .catch((err) =>
      next({
        errorMsg: 'Error in petController.deleteVaccinations: ',
        err: err,
      })
    );
};

// ------ Deleting a medication ------ //
petController.deleteMedication = (req, res, next) => {
  console.log('inside petController.deleteMedication');
  const { medId } = req.body;
  const params = [medId];
  const deleteQ = 'DELETE FROM medications WHERE id = $1';
  db.query(deleteQ, params)
    .then(() => {
      return next();
    })
    .catch((err) =>
      next({ errorMsg: 'Error in petController.deleteMedication: ', err: err })
    );
};

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
  "phone": "555-555-5555",
  "clinic": "Super Duper Animal Hospital",
  "user_id": 1
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
