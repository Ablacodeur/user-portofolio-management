import { Button, Stack } from '@mui/joy'
import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { useSelector } from 'react-redux';

export default function CardComponent({ project ,page }) {

  console.log(" le project :", project);


const raw = project?.project_image || null;

const imagePath = raw
  ? (raw.startsWith('http')
      ? raw
      : `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}${raw.startsWith('/') ? '' : '/'}${raw}`)
  : null;

console.log("Project Image Path:", imagePath); 

  return (
    <Card
      variant="none"
      sx={{
        width: '100%',
        height: {xs:'300px', md:'135px'},
        borderRadius: '10px',
        padding: '3px',
        display: 'flex',
        flexDirection: {xs:'column', md:'row'},


        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* 📌 ICON PRINCIPAL */}
        <Box
          sx={{
            width: {xs:'100%', md:'40%'},
            height: {xs:'60%', md:'100%'},
            display: 'flex',
            backgroundSize:'cover',
            backgroundPosition: 'center',
            backgroundRepeat:'no-repeat',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 0.2px 0px #ccc',
            backgroundImage: imagePath ? `url(${imagePath})` : 'none',
            border: '1px solid #ccc',
            marginTop: {xs:'5px', md:'30px'},
            marginBottom: {xs:'3px', md:'30px'},
            borderRadius: '10px',
            
          }}
        >
          {/* <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
          <img src={imagePath} alt="icon" style={{ width: '60%', maxHeight: '100%' }} />
          </Box> */}
        </Box>
      {/* 📌 CONTENU TEXTE */}
      <Box sx={{ 
        textAlign: 'start', 
        marginLeft: '8px', 
        width: { xs:'100%', md:'60%'},
       }}>
        <CardContent sx={{ padding: {xs:'0px',md:'20px'}}}>
          <Typography 
          variant="h6" 
          sx={{ fontSize: '1rem', 
          fontWeight: 'bold',
            overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical'
           }}
          
          >
            {project.project_name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {project.description}
          </Typography>
          {page=== 'setting'?(
          <Button variant="contained" sx={{ backgroundColor:'#E3E8EF',marginTop:'20px' }}> 
            <Typography>
            <CreateOutlinedIcon  sx={{ width:'25px',height:'25px', fontSize:'small'}}/>
            Edit
            </Typography>
          </Button>):(
            <Box sx={{ display: 'flex', gap: '10px' }}>
            <Button variant="outlined" sx={{ backgroundColor:'white',marginTop:'20px',border:'1px solid #E3E8EF',color:'#595a5c' }}> 
            <Typography sx={{ display: 'flex', gap: '5px',fontSize:{xs:'12px',md:'15px'} }}>
            <a href={project.demo_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              Demo URL
            </a>            
            <Stack>
            <OpenInNewOutlinedIcon  sx={{ width:{xs:'15px', md:'20px'},height:{xs:'15px', md:'20px'}, fontSize:'small'}}/>
            </Stack>
            </Typography>
          </Button>
          <Button variant="outlined" sx={{ backgroundColor:'white',marginTop:'20px',border:'1px solid #E3E8EF',color:'#595a5c' }}> 
          <Typography sx={{ display: 'flex', gap: '5px',fontSize:{xs:'12px',md:'15px'} }}>
            <a href={project.repo_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              Repository URL
            </a>            
            <Stack sx={{ display: 'flex',justifyContent: 'center', alignItems: 'center' }}> 
            <OpenInNewOutlinedIcon  sx={{ width:{xs:'15px', md:'20px'},height:{xs:'15px', md:'20px'}, fontSize:'small'}}/>
            </Stack>

            </Typography>
          </Button>
          </Box>
          )}
        </CardContent>
      </Box>

    </Card>
  )
}
