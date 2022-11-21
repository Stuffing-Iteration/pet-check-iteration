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

// const rows = [
//   { id: 1, medication: 'Flea pill', dosage: '', instruction: '', reason: '' },
//   { id: 2, medication: '', dosage: '', instruction: '', reason: '' },
//   { id: 3, medication: '', dosage: '', instruction: '', reason: '' },
//   {
//     id: 4,
//     medication: '',
//     dosage: '',
//     instruction: '',
//     reason: '',
//   },
//   { id: 5, medication: '', dosage: '', instruction: '', reason: '' },
// ];

export default function ViewMedications(props) {
  const { medication, dosage, instructions, reason } = props.medication;
  console.log('medication info: ', props.medication);
  const rows = [
    {
      id: 1,
      medication: medication,
      dosage: dosage,
      instructions: instructions,
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
