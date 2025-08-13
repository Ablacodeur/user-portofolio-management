import { Box } from '@mui/material'
import React from 'react'
import { SearchBar } from '../SearchBar/SearchBar'
import { Button } from '@mui/joy'
import { useNavigate } from 'react-router-dom';


export default function NavBar() {
    const navigate = useNavigate();
  return (
    <Box >
        <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">USM</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse  justify-content-end  " id="navbarSupportedContent">
                <SearchBar />
                <Button onClick={()=>navigate("/signin")} variant="text" sx={{ height:'50px' }}>Sign in</Button>
                <Button onClick={()=>navigate("/signup")} variant="outlined" sx={{ height:'50px',borderRadius:'10px' }}>Sign up</Button>

            </div>
        </div>
        </nav>    

    </Box>
  )
}
