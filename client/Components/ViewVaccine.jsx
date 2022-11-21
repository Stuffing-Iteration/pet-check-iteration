import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'vaccine', headerName: 'Vaccine', width: 130 },
  { field: 'date', headerName: 'Date', width: 60 },
  { field: 'expiration', headerName: 'Expiration', width: 130 },
  {
    field: 'vet',
    headerName: 'Vet',
    width: 90,
  },
];

// const rows = [
//   { id: 1, vaccine: 'Bordetella', date: '', expiration: '', vet: '' },
//   // { id: 2, vaccine: 'DA2PP', date: '', expiration: '', vet: '' },
//   // { id: 3, vaccine: 'Influenza', date: '', expiration: '', vet: '' },
//   // {
//   //   id: 4,
//   //   vaccine: 'Leptospirosis',
//   //   date: '',
//   //   expiration: '',
//   //   vet: '',
//   // },
//   // { id: 5, vaccine: 'Rabies', date: '', expiration: '', vet: '' },
// ];

export default function ViewVaccine(props) {
  const { vaccine, date, expiration, location, vet_id } = props.vaccineInfo;
  console.log('vaccine info from viewVaccine', props.vaccineInfo);
  const rows = [
    {
      id: 1,
      vaccine: vaccine,
      date: date,
      expiration: expiration,
      vet: vet_id,
    },
    // { id: 2, vaccine: 'DA2PP', date: '', expiration: '', vet: '' },
    // { id: 3, vaccine: 'Influenza', date: '', expiration: '', vet: '' },
    // {
    //   id: 4,
    //   vaccine: 'Leptospirosis',
    //   date: '',
    //   expiration: '',
    //   vet: '',
    // },
    // { id: 5, vaccine: 'Rabies', date: '', expiration: '', vet: '' },
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
        <DialogTitle>View Vaccine Record</DialogTitle>
        <DialogContent>
          <div
            style={{ height: 400, width: '500px' }}
            // open={open}
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
