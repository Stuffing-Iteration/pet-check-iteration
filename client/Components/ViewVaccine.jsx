import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'vaccine', headerName: 'Vaccine', width: 70 },
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'expiration', headerName: 'Expiration', width: 130 },
  {
    field: 'vet',
    headerName: 'Vet',
    width: 90,
  },
];

const rows = [
  { id: 1, vaccine: 'Bordetella', date: '', expiration: '', vet: '' },
  { id: 2, vaccine: 'DA2PP', date: '', expiration: '', vet: '' },
  { id: 3, vaccine: 'Influenza', date: '', expiration: '', vet: '' },
  {
    id: 4,
    vaccine: 'Leptospirosis',
    date: '',
    expiration: '',
    vet: '',
  },
  { id: 5, vaccine: 'Rabies', date: '', expiration: '', vet: '' },
];

export default function ViewVaccine() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        className='viewVaccine'
        variant='outlined'
        onClick={handleClickOpen}
      >
        View
      </Button>
      <div
        style={{ height: 400, width: '100%' }}
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
        {/* <Button onClick={handleClose}>Cancel</Button> */}
      </div>
    </>
  );
}
