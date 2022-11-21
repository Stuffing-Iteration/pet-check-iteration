import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'date', headerName: 'Date', width: 70 },
  { field: 'time', headerName: 'Time', width: 130 },
  { field: 'location', headerName: 'Location', width: 130 },
  {
    field: 'vet',
    headerName: 'Vet',
    width: 90,
  },
  { field: 'Reason', headerName: 'Reason', width: 130 },
];

// const rows = [
//   { id: 1, date: '', time: '', location: '', vet: '', reason: '' },
//   { id: 2, date: '', time: '', location: '', vet: '', reason: '' },
//   { id: 3, date: '', time: '', location: '', vet: '', reason: '' },
//   {
//     id: 4,
//     date: '',
//     time: '',
//     location: '',
//     vet: '',
//     reason: '',
//   },
//   { id: 5, date: '', time: '', location: '', vet: '', reason: '' },
//   { id: 6, date: '', time: '', location: '', vet: '', reason: '' },
// ];

export default function ViewAppointments({ appts }) {
  const { date, time, location, vet, reason } = appts;

  const rows = [
    {
      id: 1,
      date: date,
      time: time,
      location: location,
      vet: vet,
      reason: reason,
    },
  ];

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button className='addNote' variant='outlined' onClick={handleClickOpen}>
        View
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>View Appointments</DialogTitle>
        <DialogContent>
          <div
            style={{ height: 400, width: '500px' }}
            open={open}
            onClose={handleClose}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={handleClick}>Submit</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
