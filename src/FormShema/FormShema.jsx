import React, { useEffect, useState } from 'react';
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { Box,Typography } from "@mui/material";
import { Avatar, Grid, Textarea } from "@mui/joy";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
export default function FormShema({ theProject, onChange, onSubmit }) {
  return (
    <div>
        <form>

            <FormControl
            sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '30px',
                flexDirection: 'column',
                borderRadius: '10px',
                padding: '20px',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                height: 'auto',
                width: { xs: '100%', sm: '600px', md: '600px', lg: '800px' },
                margin: '0 auto',
            }}
            >
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

            <Box sx={{ display: 'flex' , flexDirection: 'column', gap: '5px' }}>
                <FormLabel>Project Name</FormLabel>
                <Input
                type="text"
                value={theProject.project_name || ''}
                placeholder="Enter project name"
                sx={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}
                />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <FormLabel>Demo URL</FormLabel>
            <Input
            type="text"
            value={theProject.demo_url || ''}
            placeholder="Enter your job title"
            sx={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
            }}
            />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <FormLabel>Repository URL</FormLabel>

            <Input
            type="text"
            placeholder="Enter your name"
            value={theProject.repo_url || ''}

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
            <Box             
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '5px',
                marginLeft: 'auto',
            }}
>
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
            <AddOutlinedIcon />
           Add
        
            </Button>
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
                fontWeight: 'light',
                backgroundColor: '#E3E8EF',
                boxShadow:'1px 1px 1px #ccc',
                color: 'black',
                marginLeft: 'auto',
            }}
            >
            <DeleteOutlinedIcon />
            Remove
            </Button>
            </Box>
            </FormControl>
        </form>

    </div>
  )
}
