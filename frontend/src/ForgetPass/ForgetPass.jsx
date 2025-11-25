import { Box, Button, FormControl, Input, Stack, Typography } from '@mui/joy'
import React from 'react'
import image from '../assets/resources/login-bg.png'
import s from './style.module.css'
import logo from './../assets/resources/Logo.svg'
import githubIcon from './../assets/resources/github.svg'
import { Link } from 'react-router-dom'
export default function ForgetPass() {
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
            }}>             
                <FormControl sx={{ gap:'10px', width:{xs:'80%',sm:'70%',lg:'50%'}, padding:'20px', backgroundColor:'white', borderRadius:'10px' }}>
                <Link to={"/"}> <img src={logo} alt="logo" style={{ height:'30px' }} /> </Link>                   
                    <Typography variant='h1' sx={{ fontSize:'30px',color:'black' }}>Forgot password</Typography>
                    <Typography sx={{ color:'#7d7878',fontSize:{xs:'10px',md:'15px'} }}>We’ll email you instructions to reset your password</Typography>
                    <Input placeholder='Enter a password'></Input>
                    <Button variant='solid' sx={{ backgroundColor:'#6466E9' }}>Reset password</Button>
                    <Box sx={{ display:'flex', justifyContent:'flex-start'}}>
                     <Button variant='plain' className={s.bt} sx={{ color:'#6466E9',padding:'0px' }}>Back to login</Button>
                    </Box>
                </FormControl>
            </Box>

        </Stack>    
    </Box>  
  )
}
