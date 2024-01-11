import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom'
import React from 'react'

const Book = (props) => {
    const index=props.index;
    const dynamicDelay={
        transitionDelay:`${index * 1}s`
    }
    const {_id,name,description,author,price,image}=props.book;
  return (
    <div className='card animate__animated animate__zoomIn' style={dynamicDelay} animate__zoomIn>
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
                <Button LinkComponent={NavLink} to={`/books/${_id}`} size='small'>Update</Button>
                <Button LinkComponent={NavLink} to={`/books/${_id}/delete`} size='small'>Delete</Button>
            </div>
        </div>
    </div>
  )
}
export default Book