import { Box, Stack } from '@mui/material'
import React from 'react'

export default function Footer() {
  return (
    <Box>
        <Stack>
            <Box sx={{  padding: '20px', textAlign: 'center' }}>
                <p>© 2025 User portofolio. All rights reserved.</p>
                <p>Follow us on social media</p>
            </Box>
        </Stack>
        <Stack></Stack>
    </Box>
  )
}

