import React, { useEffect, useState } from 'react'
import Book from './sub components/book';
import '../styles/book.css'
import axios from "axios"

const url=`${window.location.origin}/api/book`;
const Books = () => {
  const [books,setBooks]=useState([]);
  try{
  const fetchBooks=async ()=>{
    const res=(await (axios.get(url))).data;
    return res;}
    useEffect(()=>{
      fetchBooks().then(data=>setBooks(data.Books));
    },[]);
  }catch(err){
    console.log(err);
  }
  
  
  return (
    <>
      {books.length===0?<h1>Loading...</h1>:
      <ul>
        {books.map((book,i)=>(
          <li key={book._id} id={book._id} index={i} className='book'>
            <Book book={book}/>
          </li>
      ))}
      </ul>
    }
    </>
  )
}

export default Books;