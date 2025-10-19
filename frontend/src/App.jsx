import React, { useEffect } from 'react'
import SignIn from './SignIn/SignIn'
import './App.css'
import { Box } from '@mui/joy'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setError, setUser } from './store/user-project/userSlice'
import axios from 'axios'
export default function App() {

  
  return (
    <Box sx={{ height: '90vh',}}>
    
      <Outlet></Outlet> 
    </Box>
  )
}
