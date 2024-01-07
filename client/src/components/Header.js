import {AppBar,Tabs,Tab,Toolbar,Typography} from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Header= ()=>{
    const [value,setValue]=useState(0);

    const handleOnChange=(e,val)=>{
        setValue(val);
    }
    return(
        <AppBar position="sticky">
            <Toolbar>
                <h2 ><i className="fa-solid fa-book-open"></i><span className='cursive'>Blossom </span><span>Book House</span></h2>
                <Tabs sx={{ml:"auto"}} textColor="inherit" TabIndicatorProps={{style:{backgroundColor:'#a6aeb3'}}} value={value} onChange={handleOnChange}>
                    <Tab LinkComponent={NavLink} to="/add" label="Add Book"/>
                    <Tab LinkComponent={NavLink} to="/books" label="All Books"/>
                    <Tab LinkComponent={NavLink} to="/about" label="About Us"/>
                </Tabs>
            </Toolbar>
        </AppBar>
        )
}

export default Header