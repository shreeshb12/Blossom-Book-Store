import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, OutlinedInput, Button, Checkbox ,FormControlLabel, FormGroup} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = (props) => {
    const navigate=useNavigate();
    const [bookDetails,setBookDetails]=useState({
        _id:"",
        name:"",
        description:"",
        author:"",
        price:0,
        available:false,
        image:""
    })
    const method=props.method;

    //useEffect to set the bookDetails
    useEffect(()=>{
        if(props.bookDetails)
        {
        setBookDetails(props.bookDetails);
        console.log(props.bookDetails);
        }
    },[props.bookDetails])

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
        const body={
            name:String(bookDetails.name),
            description:String(bookDetails.description),
            author:String(bookDetails.author),
            price:Number(bookDetails.price),
            available:Boolean(bookDetails.available),
            image:String(bookDetails.image)
          };
        let resp;
        try{
            if(method==='add')
            {
                resp=await axios.post(`http://localhost:5000/book`,body);
            }
            else{
                resp=await axios.patch(`http://localhost:5000/book/${bookDetails._id}`,body);
            }
            alert(resp.data.message);
            navigate('../books');
        }
        catch(err){
            console.log(err);
        }
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



  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  )
}

export default Form