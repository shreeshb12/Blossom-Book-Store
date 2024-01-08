import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom';

const DeleteBook = () => {
    const { id } = useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        const deleteBook=async ()=>{
            const resp=await axios.delete(`http://localhost:3000/books/${id}`)
            console.log(resp.data);
            navigate('../../');
        }
        deleteBook();
    },[id,navigate])
  return (
    <div>DeleteBook</div>
  )
}

export default DeleteBook