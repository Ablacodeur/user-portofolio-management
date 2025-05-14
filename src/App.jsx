import React, { useEffect } from 'react'
import SignIn from './SignIn/SignIn'
import './App.css'
import { Box } from '@mui/joy'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setError, setUser } from './store/user-project/userSlice'
import axios from 'axios'
export default function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
          withCredentials: true, // Inclure les cookies de session
        });
        dispatch(setUser(response.data)); // Stocker l'utilisateur dans Redux
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        dispatch(setError("Non authentifié"));
      }
    };

    fetchUser();
  }, [dispatch]);
  return (
    <Box sx={{ height: '90vh',}}>
    
      <Outlet></Outlet> 
    </Box>
  )
}
