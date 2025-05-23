import { Avatar, Box, Button, FormLabel, Input, Stack, Textarea, Typography } from '@mui/joy'
import React from 'react'
import ResponsiveAppBar from '../ResponsiveAppBarResponsiveAppBar/ResponsiveAppBar'
import { FormControl, InputLabel } from '@mui/material'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ProfileSetting() {
  return (
    <Box>
        <ResponsiveAppBar  />
        <Box sx={{  
            width: '100%',
            height: '100vh',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            textAlign:'center',
            flexDirection:'column',
            gap:'10px',
            marginTop:'10px',
            marginBottom:'30px',
        }}>
            <FormLabel sx={{display: 'flex', 
            justifyContent: 'center', 
            width: {xs: '100%', sm: '95%', md: '60%' },
            flexDirection:'column',
            textAlign:'flex-start',
            alignItems:'flex-start',
            fontWeight:'bold',
            fontSize:{xs:'20px', sm:'25px', md:'30px'},
             }}>Profile settings</FormLabel>

            <FormControl sx={{ display: 'flex', 
               justifyContent: 'center',               
                gap: '30px' ,
               flexDirection:'column',
                borderRadius: '10px',
                padding: '20px',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                height: 'auto',
                width: {xs: '100%', sm: '95%', md: '60%' },
               }}>
            {/* profile image session */}
               <Box sx={{ display: 'flex',  
                justifyContent: 'center',
                alignItems: 'center',
                gap: '40px',
                flexDirection:'column',
                width: { xs: '100%', sm: '100%', md: '100%' },
                borderRadius: '10px',
                padding: '20px',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                height: 'auto',
                boxShadow:'0px 0.2px 0px #ccc',
                height: '25vh',
                backgroundColor:'#E3E8EF'
                }}>
               <Box>

               <Box sx={{ display:'flex',
                justifyContent:'center',
                alignItems:'center',
                gap:'20px',
                flexDirection:'column',}}>
                        <Box>                       
                             <Avatar
                                sx={{ width: '40px', height: '40px' }}
                                />
                         </Box>
                         <Typography level="h7" fontSize="small" sx={{ }}>
                            Image must be 256 x 256 pixels - max 2MB
                         </Typography>
               </Box>
               
         <Box sx={{ display:'flex',
                justifyContent:'space-between',
                gap:'10px',
                flexDirection:'row',
                width: '100%',
                padding: {xs:'5px', sm:'10px'},
                borderRadius: '10px',
                alignItems:'center',}}>
            <Box >
                <Input
                    type="file"
                    accept="image/*"
                    id="file-upload"
                    sx={{ display: 'none' }} // Masque l'élément d'entrée
                />
                <label htmlFor="file-upload">
                    <Button
                    variant="contained"
                    component="span" // Permet au bouton de fonctionner comme un label
                    sx={{
                        backgroundColor: '#ffffff',
                        color: 'white',
                        padding: '0px',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        width: {xs:'130px',sm:'180px'}, 
                        color:'black',
                        fontSize:'10.5px',
                        textWrap:'nowrap'
                    }}
                    >
                    <CloudUploadOutlinedIcon />
                    <span style={{  marginLeft: {xs:'2px',md:'5px' }}}></span>
                    Upload Pofile Image
                    </Button>
                </label>
            </Box>
                
        
                <Button
                    variant="contained"
                    component="span" 
                    sx={{
                        backgroundColor: '#ffffff',
                        color: 'white',
                        padding: '0px',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        width: {xs:'130px',sm:'180px'}, 
                        color:'#DD524D',
                        fontSize:'10.5px',
                        textWrap:'nowrap'
                    }}
                    >
                    <DeleteForeverOutlinedIcon 
                     />
                    <span style={{ marginLeft: {xs:'2px',md:'5px'} }}></span>
                    Delete Image
                </Button>
                </Box>
                </Box>
        </Box>              
               <Box sx={{ display:'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '5px',
                }} >
                </Box>

                <Box sx={{ display: 'grid',
                     gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                 gap: '20px' }}>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <FormLabel>Email</FormLabel>
                    <Input
                    type="email"
                    placeholder="example@mail.com"
                    sx={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <FormLabel>Job title</FormLabel>
                    <Input
                    type="text"
                    placeholder="Enter your job title"
                    sx={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                    />
                </Box>


                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <FormLabel>Name</FormLabel>
                    <Input
                    type="text"
                    placeholder="Enter your name"
                    sx={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                    />
                </Box>
                </Box>
                
                <Textarea 
                    aria-label="minimum height" 
                    minRows={5} 
                    placeholder="Enter a short intrioduction... "
                    sx={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        boxShadow:'2px 2px 2px #ccc',
                 }}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            display: 'flex',
                            width: '100px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '20px', 
                            padding: '10px',
                            gap: '5px',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            backgroundColor: '#6466E9',
                            color: 'white',
                            marginLeft: 'auto',
                        }}
                        >
                        <CheckCircleIcon />
                        Save
                    </Button>
            </FormControl>
        </Box>
    </Box>
  )
}
