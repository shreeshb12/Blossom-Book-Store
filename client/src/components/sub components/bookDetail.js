import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, FormControl, InputLabel, OutlinedInput, Button, Checkbox ,FormControlLabel, FormGroup} from '@mui/material';
import axios from 'axios';

const BookDetail = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState('');
  const navigate=useNavigate();
  //const [name,author,description,price,available,image]=JSON.parse(bookDetails);

  //handle input change
  const handleChange=(e)=>{
    console.log(e.target.id+" "+e.target.checked);
    setBookDetails((prevState)=>({
        ...prevState,
        [e.target.id]:e.target.type==='checkbox'?e.target.checked:e.target.value
    }))
    console.log(bookDetails);
  }

  // handle form submit
  const handleSubmit=async (e)=>{
      e.preventDefault();
      const resp=await axios.patch(`http://localhost:5000/book/${id}`,{
        name:String(bookDetails.name),
        description:String(bookDetails.description),
        author:String(bookDetails.author),
        price:Number(bookDetails.price),
        available:Boolean(bookDetails.available),
        image:String(bookDetails.image)
      })
      alert(resp.data.message);
      navigate('../');
  }

  // handle image change
  const handleImageChange=(e)=>{
    let file=e.target.files[0];

    if(file)
    {
        const reader=new FileReader(file);
        reader.readAsDataURL(file);
        reader.onload=()=>{
            console.log(reader.result)
            setBookDetails((prevState)=>({
              ...prevState,
              image:reader.result
          }))
        }
    }
  }

  //fetch the book details by id and set the value
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const resp = await axios.get(`http://localhost:5000/book/${id}`);
        setBookDetails(resp.data);
        console.log(resp.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchHandler();
  }, [id]);



  return (
    <>
    {bookDetails?<form onSubmit={handleSubmit}>
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
    <FormGroup style={{ width:'40%', margin:'10px'}}  >

        <FormControl variant="outlined" style={{ margin: '5px', width: '100%' }} required>
          <InputLabel htmlFor="name">Name </InputLabel>
          <OutlinedInput type="string" id="name" label="Name" className='input' onChange={handleChange} value={bookDetails.name} />
        </FormControl>

        <FormControl variant="outlined" style={{ margin: '5px', width: '100%' }} required>
          <InputLabel htmlFor="author">Author</InputLabel>
          <OutlinedInput type="string" id="author" label="Author" className='input' onChange={handleChange} value={bookDetails.author}/>
        </FormControl>

        <FormControl variant="outlined" style={{ margin: '5px', width: '100%' }} required>
          <InputLabel htmlFor="description">Description</InputLabel>
          <OutlinedInput type="string" id="description" label="Description" className='input' onChange={handleChange} value={bookDetails.description} />
        </FormControl>

        <FormControl variant="outlined" style={{ margin: '5px', width: '100%' }} required>
          <InputLabel htmlFor="price">Price</InputLabel>
          <OutlinedInput type="number" id="price" label="price" className='input' onChange={handleChange} value={bookDetails.price} />
        </FormControl>

        <InputLabel htmlFor="outlined-adornment-image" style={{ margin: '5px', width: '100%' }} >Image*</InputLabel>
            <FormControl variant="outlined" style={{ margin: '5px', width: '100%' }}>
            <OutlinedInput id="image" type="file" label="Image" className='input' onChange={handleImageChange} />
        </FormControl>

        <FormControlLabel
        label="Available"
            control={
              <Checkbox name="available" id="available" checked={bookDetails.available} onChange={handleChange}/>
            } sx={{margin:'5px'}}
          /><br/>
          <img src={bookDetails.image} alt='no-img' height={'200px'} width={'150px'}/>

        <Button style={{margin:'5px'} } type='submit' variant="contained" >Submit</Button>
      </FormGroup>
    </Box>
    </form>:<div>Not Found</div>}
    </>
  );
};

export default BookDetail;
