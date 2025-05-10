import { Avatar, Box, Dropdown, Menu, MenuButton, MenuItem, Stack, Typography } from '@mui/joy'
import React from 'react'
import logo from './../assets/resources/logo.svg'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import AirplayOutlinedIcon from '@mui/icons-material/AirplayOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ResponsiveAppBar() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleOpenChange = React.useCallback(
        (event, isOpen) => {
        setOpen(isOpen);
        },
        [],
    );

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
        withCredentials: true, // Inclure les cookies pour la session
      });
      console.log(response.data.message); // Affiche "Déconnexion réussie"
      navigate("/signin"); // Redirige vers la page de connexion
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };
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
                        <MenuItem> <AccountCircleOutlinedIcon />
                        <Link to={"/profile"} style={{ color:'black', textDecoration:'none' }}></Link>
                         Profile settings
                         </MenuItem>
                        <MenuItem > <PhotoLibraryOutlinedIcon /> 
                        <Link to={"/projectsetting"} style={{ color:'black', textDecoration:'none' }} > Project settings</Link>
                       </MenuItem>
                        <MenuItem><AirplayOutlinedIcon />
                            <Link to={"/portofolio"} style={{ color:'black', textDecoration:'none' }} >     
                                My  Portofolio
                            </Link>
                         </MenuItem>
                        <Box sx={{ width: '100%', borderTop: '1px solid #ccc', margin: '10px 0' }} />
                        <MenuItem  sx={{ color:'red' }}  onClick={handleLogout} ><ExitToAppOutlinedIcon /> Logout</MenuItem>

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

