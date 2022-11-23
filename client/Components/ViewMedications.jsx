import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// medication, dosage, instructions, pet_id, vet_id, reason
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'medication', headerName: 'Medication', width: 70 },
  { field: 'dosage', headerName: 'Dosage', width: 130 },
  { field: 'instruction', headerName: 'Instruction', width: 130 },
  {
    field: 'reason',
    headerName: 'Reason',
    width: 90,
  },
];

export default function ViewMedications({meds, petId}) {

  const [rows, setRows] = React.useState([]);

  const createRows = (data) => {
    if(data) {
      const newRows = data.map(med => {
        const { id, medication, dosage, instructions, reason, pet_id, vet_id } = med;

        return {
          id: id, 
          medication: medication,
          dosage: dosage,
          instructions: instructions,
          reason: reason,
          pet_id: pet_id,
          vet_id: vet_id
        }
      })
      setRows(newRows)
      }
    };
  
  const fetchData = () => {
    fetch(`/api/meds/${petId}`)
      .then(response => response.json())
      .then(data => {
        createRows(data);
      })
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    fetchData();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRowClick = (e) => {
    console.log('row has been clicked')
    console.log(e);
    clickedRows[e.id] ? delete clickedRows[e.id] : clickedRows[e.id] = true; 
    console.log('clickedRows', clickedRows)
  };

  const handleDelete = (e) => {
    const ids = Object.keys(clickedRows);
    ids.forEach(id => {
      fetch(`/api/meds/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        console.log(response)
        fetchData();
      })
    })
  };

  return (
    <div>
      <Button className='addNote' variant='outlined' onClick={handleClickOpen}>
        View
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>View Medication</DialogTitle>
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
              onRowClick={handleRowClick}
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
