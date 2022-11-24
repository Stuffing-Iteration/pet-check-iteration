import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const columns = [
  // { field: 'id', headerName: 'ID', width: 30 },
  { field: 'vet', headerName: 'Vet', width: 90 },
  { field: 'location', headerName: 'Location', width: 120 },
  { field: 'phone', headerName: 'Phone', width: 140 },
  {
    field: 'clinic',
    headerName: 'Clinic',
    width: 90,
  },
];

export default function ViewVet({petId}) {

  const [rows, setRows] = React.useState([]);
  console.log('petId from view vet', petId);
  // const currGame = useSelector(state => state.game);
  const userId = useSelector(user => user.userId);

  const createRows = (data) => {
    if(data) {
      const newRows = data.map(veterinarian => {
        const { id, vet, location, phone, clinic, user_id } = veterinarian;
        return {
          id: id,
          vet: vet,
          location: location,
          phone: phone,
          clinic: clinic, 
          user_id: user_id
        }
      })
      setRows(newRows)
    }
  };

  const fetchData = () => {
    fetch(`/api/vets/${petId}`)
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
      fetch(`/api/vets/${id}`, {
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
