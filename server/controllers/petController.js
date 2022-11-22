const db = require('../db.js');

const petController = {};


/////////////////////////////////////////////////////////////////////////////////////////
// ------------------------------- Adding Pet Info ----------------------------------- //
/////////////////////////////////////////////////////////////////////////////////////////

// ------------------------ Add a new Pet ------------------------ //
petController.addPet = (req, res, next) => {
  console.log('add pet req body: ', req.body);
  const { name, owner_id, species, breed, weight, color, age, vet_id } =
    req.body;
  const qText =
    'INSERT INTO pets (name, owner_id, species, breed, weight, color, age, vet_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);';
  const params = [
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
    'INSERT INTO vets (vet, location, phone, clinic, user_id) VALUES ($1, $2, $3, $4, $5);';
  const params = [vet, location, phone, clsinic, user_id];
  db.query(qText, params)
    .then((result) => {
      console.log('returned from db query: ', result);
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
    'INSERT INTO vaccinations (vaccine, date, expiration, location, pet_id, vet_id ) VALUES ($1, $2, $3, $4, $5, $6);';
  const params = [vaccine, date, expiration, location, pet_id, vet_id];
  db.query(qText, params)
    .then((result) => {
      console.log('returned from db query: ', result);
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
    'INSERT INTO medications (medication, dosage, instructions, reason, pet_id, vet_id) VALUES ($1, $2, $3, $4, $5, $6);';
  const params = [
    medication,
    dosage,
    instructions,
    reason,
    pet_id,
    vet_id
  ];
  db.query(qText, params)
    .then((result) => {
      console.log('returned from db query: ', result);
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
  const { date, time, location, pet_id, vet_id, reason } = req.body;
  const qText =
    'INSERT INTO appointments (date, time, reason, location, pet_id, vet_id) VALUES ($1, $2, $3, $4, $5, $6);';
  const params = [date, time, reason, location, pet_id, vet_id];
  db.query(qText, params)
    .then((result) => {
      console.log('returned from db query: ', result);
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

/////////////////////////////////////////////////////////////////////////////////////////
// ------------------------- Updating Pet Info Routes ------------------------------ //
/////////////////////////////////////////////////////////////////////////////////////////

// ----- Update a pet ----- //
petController.updatePet = (req, res, next) => {
  console.log(req.body)
  const { name, owner_id, species, breed, weight, color, age, vet_id } = req.body;
  const { petid } = req.params;

  const qText = 'UPDATE pets SET name=$1, owner_id=$2, species=$3, breed=$4, weight=$5, color=$6, age=$7, vet_id=$8 WHERE id=$9'
  const params = [name, owner_id, species, breed, weight, color, age, vet_id, petid];
  db.query(qText, params)
    .then(response => {
      console.log(response);
      return next();
    })
    .catch(err => next(err));
}

// ----- Update a vaccine ----- //
petController.updateVaccine = (req, res, next) => {
  console.log(req.body)
  const { vaccine, date, expiration, location, pet_id, vet_id } = req.body;
  const { vaxid } = req.params;

  const qText = 'UPDATE vaccinations SET vaccine=$1, date=$2, expiration=$3, location=$4, pet_id=$5, vet_id=$6 WHERE id=$7'
  const params = [vaccine, date, expiration, location, pet_id, vet_id, vaxid];
  db.query(qText, params)
    .then(response => {
      console.log(response);
      return next();
    })
    .catch(err => next(err));
}

// ----- Update an appointment ----- //
petController.updateAppointment = (req, res, next) => {
  console.log(req.body)
  const { date, time, reason, location, pet_id, vet_id } = req.body;
  const { apptid } = req.params;

  const qText = 'UPDATE appointments SET date=$1, time=$2, reason=$3, location=$4, pet_id=$5, vet_id=$6 WHERE id=$7'
  const params = [date, time, reason, location, pet_id, vet_id, apptid];
  db.query(qText, params)
    .then(response => {
      console.log(response);
      return next();
    })
    .catch(err => next(err));
}

// ----- Update a medication ----- //
petController.updateMedication = (req, res, next) => {
  console.log(req.body)
  const { medication, dosage, instructions, reason, pet_id, vet_id } = req.body;
  const { medid } = req.params;

  const qText = 'UPDATE medications SET medication=$1, dosage=$2, instructions=$3, reason=$4, pet_id=$5, vet_id=$6 WHERE id=$7'
  const params = [medication, dosage, instructions, reason, pet_id, vet_id, medid];
  db.query(qText, params)
    .then(response => {
      console.log(response);
      return next();
    })
    .catch(err => next(err));
}

// ----- update a vet ------ //
petController.updateVet = (req, res, next) => {
  console.log(req.body)
  const { vet, location, phone, clinic, user_id } = req.body;
  const { vetid } = req.params;
  console.log('request parameters',  req.params)

  const qText = 'UPDATE vets SET vet=$1, location=$2, phone=$3, clinic=$4, user_id=$5 WHERE id=$6'
  const params = [vet, location, phone, clinic, user_id, vetid];
  db.query(qText, params)
    .then(response => {
      console.log(response);
      return next();
    })
    .catch(err => next(err));
}


/////////////////////////////////////////////////////////////////////////////////////////
// ------------------------- Deleting Pet Info Routes ------------------------------ //
/////////////////////////////////////////////////////////////////////////////////////////

// ------ Deleting an appointment ------ //
petController.deleteAppointment = (req, res, next) => {
  console.log('inside petController.deleteAppointment');
  const { apptid } = req.params;
  console.log('delete request params ', req.params);
  const params = [apptid];
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
  const { vaxid } = req.body;
  const params = [vaxid];
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
  "date": "10/12/2012",
  "expiration": "10/12/2015",
  "location": "#1 vet clinic",
  "pet_id": 2,
  "vet_id": 2
}

// ---- Medication ----- //
{
  "medication": "rexil",
  "dosage": "8 mg",
  "instructions": "once per day",
  "reason": "fleas",
  "pet_id": 2,
  "vet_id": 2
}

// ----- Appointment ----- ///
{
  "date": "01/2/2013",
  "time": "1:45",
  "reason": "teeth cleaning",
  "location": "#1 vet clinic",
  "pet_id": 2,
  "vet_id": 2
}
// ----------------------------------------------- //
*/

module.exports = petController;
