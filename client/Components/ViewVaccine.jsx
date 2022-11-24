import * as React from 'react';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const columns = [
  // { field: 'id', headerName: 'ID', width: 30 },
  { field: 'vaccine', headerName: 'Vaccine', width: 90 },
  { field: 'date', headerName: 'Date', width: 120 },
  { field: 'expiration', headerName: 'Expiration', width: 140 },
  {
    field: 'vet',
    headerName: 'Vet',
    width: 90,
  },
];

export default function ViewVaccine(props) {

  console.log('vaccine info from viewVaccine', props.vaccineInfo);
  // let rows;
  const [rows, setRows] = React.useState([]);

  const createRows = (data) => {
    if(data) {
      const newRows = data.map(vax => {
        const { id, vaccine, date, expiration, location, pet_id, vet_id } = vax;
        return {
          id: id,
          vaccine: vaccine,
          date: date.slice(0, 10),
          expiration: expiration.slice(0, 10),
          vet: vet_id
        }
      })
      setRows(newRows)
    }
  };

  const fetchData = () => {
    fetch(`/api/vax/${props.petId}`)
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

  const clickedRows = {};

  const handleRowClick = (e) => {
    console.log('row has been clicked')
    console.log(e);
    clickedRows[e.id] ? delete clickedRows[e.id] : clickedRows[e.id] = true; 
    console.log('clickedRows', clickedRows)
  };

  const handleDelete = (e) => {
    const ids = Object.keys(clickedRows);
    ids.forEach(id => {
      fetch(`/api/vax/${id}`, {
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
        <DialogTitle>View Vaccine Record</DialogTitle>
        <DialogContent>
          <div className='recordsContainer'>
            <div
              style={{ height: 400, width: '550px' }}
              // style={{ flexGrow: 1 }}
              // open={open}
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
