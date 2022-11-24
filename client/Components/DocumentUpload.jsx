import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ImageList, ImageListItem } from '@mui/material';
import axios from 'axios';
import {connect} from 'react-redux'
const mapStateToProps = state => (
  {
      username: state.user.username,
      userId: state.user.userId,
  }
); 

function DocumentUpload(props) {
console.log('props user id working' + props.userId)
const itemData = [{img: 'https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg?_=42445'},{ img: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg'},{img: 'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2019/02/dog-451643.jpg?h=bf654dbc&itok=MQGvBmuo'}]

  const [open, setOpen] = React.useState(false);
  const [imgs, setImg] = React.useState([])
  const [imgSelected, setImgSelected] = React.useState([])
  // React.useEffect(() => {
  //   fetch()
  // })
  const uploadImage = () =>{
    console.log(imgSelected);
    const formData = new FormData();
    formData.append("file", imgSelected);
    formData.append("upload_preset", "kaswf12q");
    // fetch("https://api.cloudinary.com/v1_1/do03faubd/image/upload", {
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   method: "POST",
    //   body: JSON.stringify(formData))
    // .then((data) => {
    //   return data.json()})
    axios.post('https://api.cloudinary.com/v1_1/do03faubd/image/upload', formData)
      .then(data => {
        console.log("this happened")
        console.log(data)
        return data})
      .then((data) => {
        console.log(data.data.secure_url)
        fetch(`api/pets/documentset/${props.userId}/${props.petId}`)
            .then((data) =>{
              return data.json()
            })
            .then((data) => {
              console.log(data)
            })
      })
  };
/*React.useEffect(() => {
  function getThePhotos() {
        fetch(`api/pets/documentretrieve/${props.userId}/${props.petId}`)
        .then((data) =>{
          return data.json()
        })
        .then((data) => {
          setImg(data)
          console.log('thisis the data' + data.retrievedDocumentInfo[0])
        })}
        getThePhotos()
}, []) */
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button className='addNote' variant='outlined' onClick={handleClickOpen}>
        Documents
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>View Your Furry Friend's Documents</DialogTitle>
        <DialogContent>
        <div><p>Upload Document: </p><input type="file" onChange={(event) => {
          setImgSelected(event.target.files[0])
        }}/></div><button onClick={uploadImage}>Upload Document</button>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {itemData.map((item) => (
            <ImageListItem key={item.img}>
            <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
      />
    </ImageListItem>
  ))}
</ImageList>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={handleClick}>Submit</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default connect(mapStateToProps)(DocumentUpload)