import { Box, Button, FormControl, Input, Stack, Typography } from '@mui/joy'
import React from 'react'
import image from '../assets/resources/login-bg.png'
import s from './style.module.css'
import logo from './../assets/resources/Logo.svg'
import githubIcon from './../assets/resources/github.svg'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';


export default function ResetPass() {
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
                    <Typography variant='h1' sx={{ fontSize:{xs:'20px',md:'30px'},color:'black' }}>Choose  new password</Typography>
                    <Typography sx={{ color:'#7d7878',fontSize:{xs:'12px',md:'20px'} }}>Enter your new password and you’re all set.</Typography>
                    <Input placeholder='Enter password'></Input>
                    <Input placeholder='Re-enter a password'></Input>
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
                    <Button variant='solid' sx={{ backgroundColor:'#6466E9' }}>Reset Password</Button>
                </FormControl>
            </Box>

        </Stack>    
    </Box>  
  )
}
