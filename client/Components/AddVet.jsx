import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

const AddVet = ({petId}) => {

  // id: id,
  //         vet: vet,
  //         location: location,
  //         phone: phone,
  //         clinic: clinic, 
  //         user_id: user_id

  const userId = useSelector(user => user.userId);
  const [vet, setVet] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [clinic, setClinic] = useState('');

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    fetch('/api/vets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        vet: vet,
        location: location,
        phone: phone,
        clinic: clinic,
        user_id: userId,
        pet_id: petId
      }),
    }).then(res => {
      alert('Veterinarian added!')
    }).catch(err => alert(err));
    
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
        <DialogTitle>Add Vaccine Record</DialogTitle>
        <DialogContent>
          <form className='add-vaccine-form'>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <InputLabel htmlFor='vetName'>Vet Name</InputLabel>
              <OutlinedInput
                autoComplete='off'
                id='vetName'
                onChange={(e) => {
                  setVet(e.target.value);
                }}
                label='VetName'
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <InputLabel htmlFor='location'>Location</InputLabel>
              <OutlinedInput
                autoComplete='off'
                id='location'
                onChange={(e) => setLocation(e.target.value)}
                label='location'
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <InputLabel htmlFor='phone'>Phone #</InputLabel>
              <OutlinedInput
                autoComplete='off'
                id='phone'
                onChange={(e) => setPhone(e.target.value)}
                label='phone'
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <InputLabel htmlFor='clinic'>Clinic</InputLabel>
              <OutlinedInput
                autoComplete='off'
                id='clinic'
                onChange={(e) => setClinic(e.target.value)}
                label='clinic'
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

export default AddVet;
