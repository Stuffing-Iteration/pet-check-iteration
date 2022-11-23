import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { GridEventListener } from '@mui/x-data-grid';
import { MuiEvent } from '@mui/x-data-grid';
// import { DataGrid } from '@mui/x-data-grid';

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

export default function ViewAppointments({ appts, petId }) {

  const [rows, setRows] = React.useState([]);

  const createRows = (data) => {
    if(data) {
      const newRows = data.map(appt => {
        const { id, date, time, reason, location } = appt;
        return {
          id: id, 
          date: date,
          time: time,
          reason: reason,
          location: location,
          pet_id: petId,
          vet_id: 2
        }
      })
      setRows(newRows)
      }
    };
  
  const fetchData = () => {
    fetch(`/api/appts/${petId}`)
      .then(response => response.json())
      .then(data => {
        createRows(data);
      })
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    fetchData()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleCheckBoxClick: GridEventListener<'rowSelectionCheckboxChange'> = (
  //   params,  // GridRowSelectionCheckboxParams
  //   event,   // MuiEvent<React.ChangeEvent<HTMLElement>>
  //   details, // GridCallbackDetails
  // ) => {
  //   return;
  // };

  const [clicked, setClicked] = React.useState([]);
  const clickedRows = {};

  const handleRowClick = (e) => {
    console.log('row has been clicked')
    console.log(e);
    clickedRows[e.id] ? delete clickedRows[e.id] : clickedRows[e.id] = true; 
    console.log('clickedRows', clickedRows)
  } 

  const handleDelete = (e) => {
    const ids = Object.keys(clickedRows);
    ids.forEach(id => {
      fetch(`/api/appts/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        console.log(response)
        fetchData();
      })
    })

  }

  return (
    <div>
      <Button className='addNote' variant='outlined' onClick={handleClickOpen}>
        View
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>View Appointments</DialogTitle>
        <DialogContent>
          <div
            style={{ height: 400, width: '600px' }}
            open={open}
            onClose={handleClose}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              onRowClick={handleRowClick}
              // onRowSelectionCheckboxChange={handleRowClick}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete Selected</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
