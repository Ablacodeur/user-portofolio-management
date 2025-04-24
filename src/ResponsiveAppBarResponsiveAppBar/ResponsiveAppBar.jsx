import { Avatar, Box, Dropdown, Menu, MenuButton, MenuItem, Stack, Typography } from '@mui/joy'
import React from 'react'
import logo from './../assets/resources/logo.svg'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import AirplayOutlinedIcon from '@mui/icons-material/AirplayOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

export default function ResponsiveAppBar() {
    const [open, setOpen] = React.useState(false);

    const handleOpenChange = React.useCallback(
        (event, isOpen) => {
        setOpen(isOpen);
        },
        [],
    );
  return (   
    <Box>

    <nav class="navbar sticky-top  ">
        <div class="container-fluid">
            <Box sx={{ flexDirection:'row', 
            justifyContent:'space-between',
            display:'flex',
            alignItems: 'center',
            width: '100%', 
            
             }}>
            <img src={logo} href="#" />
            <Box>
            <Dropdown  sx={{ position: 'relative' }} open={open} onOpenChange={handleOpenChange}>
                   
                    <MenuButton
                        sx={{
                        borderRadius: '50%',
                        padding: 0,
                        width: 40,
                        height: 40,
                        overflow: 'hidden',
                        border: '2px solid #ccc',
                        backgroundColor: '#f5f5f5',
                       
                        }}
                    >
                        <Avatar
                        src="https://via.placeholder.com/150" 
                        alt="Profile"
                        sx={{ width: '100%', height: '100%' }}
                        />
                    </MenuButton>

                    {/* Menu déroulant */}
                    <Menu sx={{ padding:'15px'}}>
                        <MenuItem>
                            <Box>
                                <Avatar
                                    src="https://via.placeholder.com/150" 
                                    alt="Profile"
                                    sx={{ width:30, height: 30, marginRight: 1 }} 
                                />
                            </Box>
                            <Box>
                                <Typography variant='h4' sx={{ fontSize:'medium',color:'black' }}>
                                    Tyler Johson
                                </Typography>
                                <Typography variant='h6'sx={{ fontSize:'small'}}>
                                abla@yahoo.fr</Typography>
                            </Box>
                            </MenuItem>
                            <Box sx={{ width: '100%', borderTop: '1px solid #ccc', margin: '10px 0' }} />
                        <MenuItem>
                        <Typography variant='h6'sx={{ fontSize:'small'}}>Account</Typography>
                        </MenuItem>
                        <MenuItem> <AccountCircleOutlinedIcon /> Profile settings</MenuItem>
                        <MenuItem> <PhotoLibraryOutlinedIcon /> Project settings</MenuItem>
                        <MenuItem><AirplayOutlinedIcon /> My  Portofolio</MenuItem>
                        <Box sx={{ width: '100%', borderTop: '1px solid #ccc', margin: '10px 0' }} />
                        <MenuItem  sx={{ color:'red' }} ><ExitToAppOutlinedIcon /> Logout</MenuItem>

                    </Menu>
            </Dropdown>
            </Box>
            </Box>
        </div>
        <Box sx={{ width: '100%', borderTop: '1px solid #ccc', margin: '5px 0' }} />

    </nav>  
    </Box>

  )
}

