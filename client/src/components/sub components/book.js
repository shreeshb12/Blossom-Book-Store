import { Button } from '@mui/material';
import React from 'react'

const Book = (props) => {
    console.log(props.book);
    const {name,description,author,price,image}=props.book;
  return (
    <div className='card'>
        <div className='book-top'>
            <img alt='no-img' src={image} className='img'/>
            <div className='overlay' id='description'>
                <p>{description}</p>
            </div>
        </div>
        <div className='book-footer'>
            <article>by {author}</article>
            <h3>{name}</h3>
            <h6>Price: <span>₹<s>{price+price*20/100}</s> {price}</span></h6>
            <div className='buttons'>
                <Button size='small'>Update</Button>
                <Button size='small'>Delete</Button>
            </div>
        </div>
    </div>
  )
}
export default Book