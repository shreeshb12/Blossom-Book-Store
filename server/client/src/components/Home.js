import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    navigate('./books');
  })
  
  return (
    <div>Redirecting...</div>
  )
}

export default Home;
