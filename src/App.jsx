import React from 'react'
import SignIn from './SignIn/SignIn'
import './App.css'
import { Box } from '@mui/joy'
import { Outlet } from 'react-router-dom'
export default function App() {
  return (
    <Box sx={{ height: '90vh',}}>
    
      <Outlet></Outlet> 
    </Box>
  )
}
