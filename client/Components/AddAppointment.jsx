import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';

// const appt = {
//   date: '1/22/23',
//   time: '1:30',
//   location: '',
//   vet: '',
//   reason: 'check-up',
// };

const AddAppointment = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [vet, setVet] = useState('');
  const [reason, setReason] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    fetch('http://localhost:3000/appts', {
      method: 'POST',
      body: {
        date: date,
        time: time,
        location: location,
        vet: vet,
        reason: reason,
      },
    }).then((response) => console.log(response));
    // useEffect(() => {
    //   axios
    //     .post('http://localhost:3000/appts', {
    //       date: date,
    //       time: time,
    //       location: location,
    //       vet: vet,
    //       reason: reason,
    //     })
    //     .then((res) => {
    //       console.log('posted: ', res);
    //     })
    //     .catch((err) => console.log(err));
    // });
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
        <DialogTitle>Add Appointments</DialogTitle>
        <DialogContent>
          <form className='add-appt-form'>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <InputLabel htmlFor='date'>Date</InputLabel>
              <OutlinedInput
                autoComplete='off'
                id='date'
                onChange={(e) => setDate(e.target.value)}
                label='date'
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <InputLabel htmlFor='time'>Time</InputLabel>
              <OutlinedInput
                autoComplete='off'
                id='time'
                onChange={(e) => setTime(e.target.value)}
                label='time'
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <InputLabel htmlFor='Location'>Location</InputLabel>
              <OutlinedInput
                autoComplete='off'
                id='Location'
                onChange={(e) => setLocation(e.target.value)}
                label='Location'
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <InputLabel htmlFor='Vet'>Vet Name</InputLabel>
              <OutlinedInput
                autoComplete='off'
                id='Vet'
                onChange={(e) => setVet(e.target.value)}
                label='Vet'
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <InputLabel htmlFor='Reason'>Reason for Appointment</InputLabel>
              <OutlinedInput
                autoComplete='off'
                id='Reason'
                onChange={(e) => setReason(e.target.value)}
                label='Reason'
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

export default AddAppointment;
