import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import remoteimage from '../assets/resources/Remote-Working-removebg-preview.png'
import { Link } from 'react-router-dom'

export default function RemotePage() {
  return (
    <Box sx={{ padding: { xs: 2, md: 6 } }}>
      <Stack 
        direction={{ xs: "column", md: "row" }} 
        spacing={4}
        alignItems="center"
        justifyContent="space-between"
      >
        
        {/* Left content */}
        <Box sx={{ maxWidth: "500px" }}>
          <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 2 }}>
            Make<br/>remote work
          </Typography>

          <Typography sx={{ color: "grey.700", lineHeight: 1.6, marginBottom: 3 }}>
            Freelancing means betting on yourself — and winning.  
            Every project you finish builds your skills, your confidence, and your freedom.  
            Keep showing up, even on the hard days.  
            Your consistency will take you further than talent alone.
          </Typography>

            <Button
            component={Link}
            to="/signup"
            variant="contained"
            sx={{
                backgroundColor: "#041458",
                ":hover": { backgroundColor: "#030f40" },
                padding: "10px 24px",
                borderRadius: "10px",
                textDecoration: "none",
                color: "white",
                fontWeight: 600
            }}
            >
            Get Started
            </Button>
        </Box>

        {/* Right image */}
        <Box sx={{ maxWidth: "450px", width: "100%" }}>
          <img 
            src={remoteimage} 
            alt="remote work" 
            style={{ width: "100%", objectFit: "contain" }} 
          />
        </Box>

      </Stack>
    </Box>
  )
}
