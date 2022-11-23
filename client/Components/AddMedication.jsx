import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// const appt = {
//   date: '1/22/23',
//   time: '1:30',
//   location: '',
//   vet: '',
//   reason: 'check-up',
// };

const AddMedication = ({petId}) => {
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [location, setLocation] = useState('');
  const [vet, setVet] = useState('');
  const [reason, setReason] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClick = async () => {
    fetch('/api/meds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        medication: medication,
        dosage: dosage,
        instructions: instructions,
        reason: reason,
        pet_id: petId,
        vet_id: 2
      }),
    }).then(res => {
      alert('Medication added!')
    }).catch(err => alert(err));;
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button className='addNote' variant='outlined' onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Medications</DialogTitle>
        <DialogContent>
          <form className='add-appt-form'>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <InputLabel htmlFor='medication'>Medication</InputLabel>
              <OutlinedInput
                autoComplete='off'
                id='medications'
                onChange={(e) => setMedication(e.target.value)}
                label='medication'
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <InputLabel htmlFor='dosage'>Dosage</InputLabel>
              <OutlinedInput
                autoComplete='off'
                id='dosage'
                onChange={(e) => setDosage(e.target.value)}
                label='dosage'
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <InputLabel htmlFor='Instructions'>Instructions</InputLabel>
              <OutlinedInput
                autoComplete='off'
                id='Instructions'
                onChange={(e) => setInstructions(e.target.value)}
                label='Instructions'
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <InputLabel htmlFor='Reason'>Reason</InputLabel>
              <OutlinedInput
                autoComplete='off'
                id='Reason'
                onChange={(e) => setReason(e.target.value)}
                label='Reason'
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <InputLabel htmlFor='Vet'>Vet</InputLabel>
              <OutlinedInput
                autoComplete='off'
                id='Vet'
                onChange={(e) => setVet(e.target.value)}
                label='Vet'
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClick}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddMedication;
