import React, { useState } from 'react';
import { Box, FormControl, InputLabel, OutlinedInput, Button, Checkbox ,FormControlLabel, FormGroup} from '@mui/material';
import { useFormInput } from '../hooks/CustomHooks';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
const AddBook = () => {
// Custom hook to handle form input
  const name=useFormInput('');
  const description=useFormInput('');
  const author=useFormInput('');
  const price=useFormInput(0);
  const available=useFormInput(false);
  const [image,setImage]=useState('');
  const navigate=useNavigate();

//   convert the image into base64
  const handleImageChange=(e)=>{
    let file=e.target.files[0];

    if(file)
    {
        const reader=new FileReader(file);
        reader.readAsDataURL(file);
        reader.onload=()=>{
            console.log(reader.result)
            setImage(reader.result);
        }
    }
  }



  const handleFormSubmit = async(e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/book',{
        name:String(name.value),
        description:String(description.value),
        author:String(author.value),
        price:Number(price.value),
        available:Boolean(available.value),
        image:String(image)
    }).then(resp=>console.log(resp));
    navigate('/books');
  };


  return (
    <form onSubmit={handleFormSubmit}>
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
    <FormGroup style={{ width:'40%', margin:'10px'}}  >

        <FormControl variant="outlined" style={{ margin: '5px', width: '100%' }} required>
          <InputLabel htmlFor="name">Name </InputLabel>
          <OutlinedInput type="string" id="name" label="Name" className='input' {...name}/>
        </FormControl>

        <FormControl variant="outlined" style={{ margin: '5px', width: '100%' }} required>
          <InputLabel htmlFor="author">Author</InputLabel>
          <OutlinedInput type="string" id="author" label="Author" className='input' {...author}/>
        </FormControl>

        <FormControl variant="outlined" style={{ margin: '5px', width: '100%' }} required>
          <InputLabel htmlFor="description">Description</InputLabel>
          <OutlinedInput type="string" id="description" label="Description" className='input' {...description} />
        </FormControl>

        <FormControl variant="outlined" style={{ margin: '5px', width: '100%' }} required>
          <InputLabel htmlFor="price">Price</InputLabel>
          <OutlinedInput type="number" id="price" label="price" className='input' {...price} />
        </FormControl>

        <InputLabel htmlFor="outlined-adornment-image" style={{ margin: '5px', width: '100%' }} >Image*</InputLabel>
            <FormControl variant="outlined" style={{ margin: '5px', width: '100%' }} required>
            <OutlinedInput id="outlined-adornment-image" type="file" label="Image" className='input' onChange={handleImageChange}/>
        </FormControl>

        <FormControlLabel
        label="Available"
            control={
              <Checkbox name="available" {...available}/>
            } sx={{margin:'5px'}}
          /><br/>

        <Button style={{margin:'5px'} } type='submit' variant="contained" >Submit</Button>
      </FormGroup>
    </Box>
    </form>
  );
};

export default AddBook;
