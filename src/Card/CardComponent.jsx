import { Button, Stack } from '@mui/joy'
import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';

export default function CardComponent({ task ,page }) {
  return (
    <Card
      variant="none"
      sx={{
        width: '100%',
        height: {xs:'95px', md:'135px'},
        borderRadius: '10px',
        padding: '3px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* 📌 ICON PRINCIPAL */}
        <Box
          sx={{
            width: '40%',
            height: '100%',
            display: 'flex',
            borderRadius: '5px',
            backgroundSize:'cover',
            backgroundPosition: 'center',
            backgroundRepeat:'no-repeat',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 0.2px 0px #ccc',
            backgroundImage: `url('https://picsum.photos/id/237/200/300/?blur=4')`,  
            border: '1px solid #ccc',
            marginTop: '30px',
            marginBottom: '30px',
            borderRadius: '10px',
            
          }}
        >
          <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
          <img src='https://picsum.photos/id/237/200/300' alt="icon" style={{ width: '60%', maxHeight: '100%' }} />
          </Box>
        </Box>
      {/* 📌 CONTENU TEXTE */}
      <Box sx={{ textAlign: 'start', marginLeft: '8px', width: '60%' }}>
        <CardContent sx={{ padding: '20px' }}>
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
            {task.project_name}
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
            {task.description}
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
            <Typography sx={{ display: 'flex', gap: '5px',}}>
            Demo URL
            <OpenInNewOutlinedIcon  sx={{ width:'20px',height:'20px', fontSize:'small'}}/>
            </Typography>
          </Button>
          <Button variant="outlined" sx={{ backgroundColor:'white',marginTop:'20px',border:'1px solid #E3E8EF',color:'#595a5c' }}> 
          <Typography>
            Repository URL
            <OpenInNewOutlinedIcon  sx={{ width:'20px',height:'20px', fontSize:'small'}}/>

            </Typography>
          </Button>
          </Box>
          )}
        </CardContent>
      </Box>

    </Card>
  )
}
