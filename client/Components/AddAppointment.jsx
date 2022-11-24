import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';

const AddAppointment = ({petId}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [vet, setVet] = useState('');
  const [reason, setReason] = useState('');
  const [open, setOpen] = React.useState(false);
  const [currVet, setCurrVet] = useState('');
  const [vets, setVets] = useState([]);


  const handleClick = () => {
    
    fetch('/api/appts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: date,
        time: time,
        location: location,
        vet_id: vet,
        reason: reason,
        pet_id: petId 
      }),
    }).then(res => {
      alert('Appointment added!')
    }).catch(err => alert(err));
    handleClose();
  };

  useEffect(() => {
    fetch(`api/vets/${petId}`)
      .then(response => response.json())
      .then(data => {
        setVets(data)
        console.log('useEffect has been called')
      })
  }, [JSON.stringify(vets)])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setCurrVet(e.target.value)
  }
  
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
              <InputLabel htmlFor='Reason'>Reason for Appointment</InputLabel>
              <OutlinedInput
                autoComplete='off'
                id='Reason'
                onChange={(e) => setReason(e.target.value)}
                label='Reason'
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <InputLabel>Choose a Vet</InputLabel>
              <Select 
                value={currVet}
                label='Vets'
                onChange={handleChange}
                >
                  { vets.length ? 
                      vets.map(vet => {
                      return <MenuItem value={vet.vet}>{vet.vet}</MenuItem>
                    })
                  : 'Vets'
                  }
                  {/* <MenuItem value={'Stella'}>Stella</MenuItem> */}

              </Select>
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
