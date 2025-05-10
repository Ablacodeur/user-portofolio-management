import { Box, Button, FormControl, Input, Stack, Typography } from '@mui/joy'
import React, { useState } from 'react'
import image from '../assets/resources/login-bg.png'
import s from './style.module.css'
import logo from './../assets/resources/logo.svg'
import githubIcon from './../assets/resources/github.svg'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        email: '',
        password: '',
    })

    function handleChange(e){
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
        
    }
    console.log(login);
    
  return (
    <Box>
        <Stack sx={{ width: '100%', height: '90vh', 
        justifyContent: 'space-around', 
        flexDirection:'row'}}>
            
            <Box sx={{ 
                width:'35%',
                height:'90vh',
                backgroundImage: `url(${image})`,
                backgroundSize:'contain',  
                backgroundRepeat: 'no-repeat',
                display: { xs: 'none', sm:'none', lg: 'flex' },
                flexDirection:'column',
                gap:'10px',
                padding: '15px 10px',
                color:'white'
                }}>
                <Typography  sx={{ color:'white'}} >Easy Portfolio for Developer</Typography>
                <Typography className={s.interText}
                  sx={{ fontSize:'12px',color:'white', fontFamily:'monospace'}}>As a web developer, having a portfolio is essential for showcasing your technical skills and attracting potential clients. A portfolio is a museum of your work, with past tech stacks, case studies, and your work history.</Typography>
            </Box>

            <Box 
                sx={{ width:{xs:'100%', sm:'70%', md:'90%'}, 
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                textAlign:'center',
                flexDirection:'column'
            }}>  
            <Box sx={{  gap:'30px' }}>
            <img src={logo} alt="logo" style={{ height:'30px' }} />                    
                    <Typography variant='h1' sx={{ fontSize:{xs:'20px',md:'30px'},color:'black' }}>Create your account</Typography>
                    <Typography sx={{ color:'#7d7878',fontSize:{xs:'12px',md:'20px'},marginTop:'20px' }}>Enter the fields below to get started</Typography>
                    <a href="http://localhost:5000/auth/github" style={{ textDecoration: 'none' }}>
            <Button sx={{ backgroundColor: '#20293A', marginTop: '20px' }}>
                <img src={githubIcon} alt="github" style={{ height: '20px', marginRight: '10px' }} />
                <Typography sx={{ color: 'white', fontSize: 'small' }}>Sign in with Github</Typography>
            </Button>
            </a>           
            </Box>  
            <form
              onSubmit={async (e) => {
                e.preventDefault(); 
                try {
                    const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`,login);
                    console.log('Tâche soumise avec succès :', response.data);
                    navigate("/signin");
                  } catch (error) {
                    console.error('Erreur lors de la soumission :', error);
                  }
                }}
                style={{ width:'60%' }}
            >

                 <FormControl 
                 sx={{ gap:'10px', width:{xs:'100%',sm:'100%',lg:'100%'}, padding:'20px', backgroundColor:'white', borderRadius:'10px' }}>
                   {/* Ligne  */}
                    <Box sx={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                        <Box sx={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></Box>
                        <Typography sx={{ margin: '0 10px', color: '#666' }}>or</Typography>
                        <Box sx={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></Box>
                    </Box>
                    <Input 
                    placeholder='Enter email'
                    onChange={handleChange}
                    type='email'
                    name='email'
                    ></Input>
                    <Input placeholder='Enter a password'
                           onChange={handleChange}
                           type='password'
                           name='password'
                    ></Input>
                    <Box sx={{ 
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)', 
                            gap: '1px', 
                            justifyItems: 'start', 
                        }}>
                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center', gap: { xs: '2px', sm: '5px' },flexWrap: 'nowrap' }}>
                            <CheckCircleRoundedIcon sx={{ color: '#e6e6ed', fontSize: { xs: '10px', sm: '16px' }}} />
                            <Typography sx={{ color:'#817b7b',fontSize: { xs: '9px', sm: 'small' } }}>one lowercase character</Typography>
                        </Box>  
                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center', gap: { xs: '2px', sm: '5px' },flexWrap: 'nowrap' }}>
                            <CheckCircleRoundedIcon sx={{ color: '#e6e6ed', fontSize: { xs: '10px', sm: '16px' }}} />
                            <Typography sx={{ color:'#817b7b',fontSize: { xs: '9px', sm: 'small' } }}>one lowercase character</Typography>
                        </Box>  
                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center', gap: { xs: '2px', sm: '5px' },flexWrap: 'nowrap' }}>
                            <CheckCircleRoundedIcon sx={{ color: '#e6e6ed', fontSize: { xs: '10px', sm: '16px' }}} />
                            <Typography sx={{ color:'#817b7b',fontSize: { xs: '9px', sm: 'small' } }}>one lowercase character</Typography>
                        </Box>  
                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center', gap: { xs: '2px', sm: '5px' },flexWrap: 'nowrap' }}>
                            <CheckCircleRoundedIcon sx={{ color: '#e6e6ed', fontSize: { xs: '10px', sm: '16px' }}} />
                            <Typography sx={{ color:'#817b7b',fontSize: { xs: '9px', sm: 'small' } }}>one lowercase character</Typography>
                        </Box>  
                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center', gap: { xs: '2px', sm: '5px' },flexWrap: 'nowrap' }}>
                            <CheckCircleRoundedIcon sx={{ color: '#e6e6ed', fontSize: { xs: '10px', sm: '16px' }}} />
                            <Typography sx={{ color:'#817b7b',fontSize: { xs: '9px', sm: 'small' } }}>one lowercase character</Typography>
                        </Box>  

                    </Box>
                    <Button variant='solid' sx={{ backgroundColor:'#6466E9' }}
                    type='submit'
                    >
                        Create account
                    </Button>
                    <Box sx={{ display:'flex', justifyContent:'flex-start'}}>
                    <Typography>Already have an account? <Button variant='plain' className={s.bt} sx={{ color:'#6466E9',padding:'0px' }}>Log in</Button></Typography>
                    </Box>
                </FormControl>
                </form>
            </Box>

        </Stack>    
    </Box>  
  )
}
