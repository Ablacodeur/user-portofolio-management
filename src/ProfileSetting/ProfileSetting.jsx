import { Avatar, Box, Button, FormLabel, Input,Textarea, Typography } from '@mui/joy'
import React, { useState } from 'react'
import ResponsiveAppBar from '../ResponsiveAppBarResponsiveAppBar/ResponsiveAppBar'
import { FormControl, InputLabel } from '@mui/material'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTheProfil } from '../store/user-project/profile-slice';
import axios from 'axios';

export default function ProfileSetting() {

            const navigate = useNavigate();
            const dispatch = useDispatch();
            const theProfil = useSelector((store) => store.PROFILE.theProfil); 
            const user_email = useSelector((state) => state.USER?.user.email);
            const user = useSelector((state) => state.USER?.user);

            function setChange(e) {
                const { name, value, files } = e.target;
              
                if (e.target.type === "file") {
                  
                  dispatch(
                    setTheProfil({
                      ...theProfil,
                      [name]: files[0], // Stocke le fichier sélectionné
                    })
                  );
                  console.log("Fichier sélectionné :", theProfil.profil_image);
                  console.log(`Fichier sélectionné :`, files[0]);
                } else {
                 
                  dispatch(
                    setTheProfil({
                      ...theProfil,
                      email: user_email,
                      [name]: value,
                    })
                  );
                  console.log(`Updated: ${name} = ${value}`);
                }
              } 
    
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
            <form
              onSubmit={async (e) => {
                e.preventDefault(); 

                try {
                    const formData = new FormData();
                    // Ajoutez toutes les propriétés de theProject à formData
                    for (const key in theProfil) {
                        formData.append(key, theProfil[key]);
                    }  
                    // Ajoutez l'ID utilisateur
                    formData.append("user_id", parseInt(Array.isArray(user?.id) ? user.id[0] : user?.id, 10));
                    console.log('user-id:', user?.id);

                    const response = await axios.post(`${import.meta.env.VITE_API_URL}/profil`,formData);
                    console.log('new user profil :', response.data);
                    dispatch(setTheProfil(response.data));
                   
                    alert('Profile updated successfully!');
                  } catch (error) {
                    console.error('Erreur lors de la cconnection :', error);
                  }
                }}
                >
             <FormLabel sx={{display: 'flex', 
                justifyContent: 'center', 
                width: {xs: '100%', sm: '95%', md: '60%' },
                flexDirection:'column',
                textAlign:'flex-start',
                alignItems:'flex-start',
                fontWeight:'bold',
                fontSize:{xs:'20px', sm:'25px', md:'30px'},
                marginBottom:'30px'
                }}>Profile settings

            </FormLabel>


            
            <FormControl sx={{ display: 'flex', 
               justifyContent: 'center',               
                gap: '30px' ,
               flexDirection:'column',
                borderRadius: '10px',
                padding: '20px',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                height: 'auto',
                width: { xs: '100%', sm: '600px', md: '600px', lg: '800px' },
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
                            <Box>
                <Button
                    variant="contained"
                    component="label" // `component="label"` pour associer le bouton à l'input
                    sx={{
                    backgroundColor: '#ffffff',
                    color: 'black',
                    padding: '10px',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    width: { xs: '130px', sm: '180px' },
                    fontSize: '10.5px',
                    textWrap: 'nowrap',
                    }}
                >
                    <CloudUploadOutlinedIcon />
                    <span style={{ marginLeft: '5px' }}>Upload Profile Image</span>
                    
                    <Input
                    type="file"
                    accept="image/*"
                    name="profil_image"
                    onChange={setChange}
                    style={{ display: 'none' }}
                    />
                </Button>
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
                    name='email'
                    value={theProfil?.email || user_email} 
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
                    name='job'
                    onChange={setChange}
                    value={theProfil?.job || ''}
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
                    name='sudoname'
                    onChange={setChange}
                    value={theProfil?.sudoname || ''}
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
                    name='about_you'
                    onChange={setChange}
                    value={theProfil?.about_you || ''} 
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
                        type='submit'
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
            </form>
        </Box>
    </Box>
  )
}
