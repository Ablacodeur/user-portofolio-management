import { Box, Button, FormControl, Input, Stack, Typography, CircularProgress } from '@mui/joy'
import React, { useState } from 'react'
import image from '../assets/resources/login-bg.png'
import s from './style.module.css'
import logo from '../assets/resources/Logo.svg'
import githubIcon from '../assets/resources/github.svg'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { setUser } from '../store/user-project/userSlice'

export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, setLogin] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false) // 🔹 état de chargement

  function handleChange(e) {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true) // 🔹 active le loader
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signin`,
        login,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          withCredentials: true,
        }
      )

      if (response.data && response.data.user) {
        dispatch(setUser(response.data.user))
        navigate("/portofolio")
      } else {
        console.error("Erreur : utilisateur non trouvé dans la réponse.")
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error)
    } finally {
      setLoading(false) // 🔹 désactive le loader
    }
  }

  return (
    <Box>
      <Stack sx={{
        width: '100%', height: '90vh',
        justifyContent: 'space-around',
        flexDirection: 'row'
      }}>
        {/* Section image */}
        <Box sx={{
          width: '35%',
          height: '100vh',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundRepeat: "no-repeat",
          display: { xs: 'none', sm: 'none', lg: 'flex' },
          borderRadius: '15px',
          flexDirection: 'column',
          gap: '10px',
          padding: '15px 10px',
          color: 'white'
        }}>
          <Typography sx={{ color: 'white' }}>Easy Portfolio for Developer</Typography>
          <Typography className={s.interText}
            sx={{ fontSize: '12px', color: 'white', fontFamily: 'monospace' }}>
            As a web developer, having a portfolio is essential for showcasing your technical skills and attracting potential clients.
          </Typography>
        </Box>

        {/* Section formulaire */}
        <Box sx={{
          width: { xs: '100%', sm: '70%', md: '90%' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          flexDirection: 'column'
        }}>
          <Box sx={{ gap: '30px' }}>
            <Link to={"/"}><img src={logo} alt="logo" style={{ height: '30px' }} /></Link>
            <Typography variant='h1' sx={{ fontSize: { xs: '20px', md: '30px' }, color: 'black' }}>Sign in to your account</Typography>
            <Typography sx={{ color: '#7d7878', fontSize: { xs: '12px', md: '20px' }, marginTop: '20px' }}>Enter your credentials below</Typography>
            <a href={`${import.meta.env.VITE_API_URL}/auth/github`} style={{ textDecoration: 'none' }}>
              <Button sx={{ backgroundColor: '#20293A', marginTop: '20px' }}>
                <img src={githubIcon} alt="github" style={{ height: '20px', marginRight: '10px' }} />
                <Typography sx={{ color: 'white', fontSize: 'small' }}>Sign in with GitHub</Typography>
              </Button>
            </a>
          </Box>

          <form onSubmit={handleSubmit} style={{ width: '60%' }}>
            <FormControl sx={{
              gap: '10px',
              width: { xs: '100%' },
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '10px'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                <Box sx={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></Box>
                <Typography sx={{ margin: '0 10px', color: '#666' }}>or</Typography>
                <Box sx={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></Box>
              </Box>

              <Input placeholder='Enter email' name='username' onChange={handleChange} type='email' />
              <Input placeholder='Enter password' name='password' onChange={handleChange} type='password' />
              <Button variant='plain' color='neutral' sx={{ color: '#6466E9', justifyContent: 'flex-end', padding: 0 }}>Forgot password?</Button>

              <Button variant='solid' sx={{ backgroundColor: '#6466E9', position: 'relative' }} type='submit' disabled={loading}>
                {loading ? (
                  <CircularProgress
                    thickness={4}
                    size="sm"
                    sx={{ color: 'white' }}
                  />
                ) : (
                  "Sign in"
                )}
              </Button>

              <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Typography>Not a member?
                  <Button variant='plain' className={s.bt} sx={{ color: '#6466E9', padding: '0px' }}>
                    <Link to={"/signup"}>Create an account</Link>
                  </Button>
                </Typography>
              </Box>
            </FormControl>
          </form>
        </Box>
      </Stack>
    </Box>
  )
}
