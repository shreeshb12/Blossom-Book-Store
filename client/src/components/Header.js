import {AppBar,Tabs,Tab,Toolbar,Typography} from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { useState } from 'react'

const Header= ()=>{
    const [value,setValue]=useState(1);

    const handleOnChange=(e,val)=>{
        setValue(val);
    }
    return(
        <AppBar position="sticky">
            <Toolbar>
                <h2 ><i class="fa-solid fa-book-open"></i><span className='cursive'>Blossom </span><span>Book House</span></h2>
                <Tabs sx={{ml:"auto"}} textColor="inherit" TabIndicatorProps={{style:{backgroundColor:'#a6aeb3'}}} value={value} onChange={handleOnChange}>
                    <Tab label="Add Book"/>
                    <Tab label="All Books"/>
                    <Tab label="About Us"/>
                </Tabs>
            </Toolbar>
        </AppBar>
        )
}

export default Header