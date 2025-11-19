import { Avatar, Box, Dropdown, Menu, MenuButton, MenuItem, Typography } from '@mui/joy'
import React from 'react'
import logo from './../assets/resources/Logo.svg'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import AirplayOutlinedIcon from '@mui/icons-material/AirplayOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function ResponsiveAppBar() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const profile = useSelector((store) => store.PROFILE.theProfil);

    // 1️⃣ Initiales
    const getInitials = (name) => {
        if (!name) return "U";

        const clean = name.trim();

        if (clean.includes(" ")) {
            const parts = clean.split(" ");
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }

        const camelMatches = clean.match(/[A-Z]/g);
        if (camelMatches && camelMatches.length >= 2) {
            return camelMatches[0] + camelMatches[1];
        }

        if (clean.includes("_")) {
            const parts = clean.split("_");
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }

        return clean[0].toUpperCase();
    };

    // 2️⃣ Image complète
    function buildImagePath(img) {
        if (!img) return null;                    
        if (img instanceof File) return null;     
        if (typeof img !== "string") return null; 

        // cas: URL Cloudinary complète
        if (img.startsWith("http")) return img;

        // cas: chemin backend /uploads
        return `${import.meta.env.VITE_API_URL}${
            img.startsWith("/") ? "" : "/"
        }${img}`;
    }

    const fullImagePath = buildImagePath(profile?.profil_image);

    const handleOpenChange = React.useCallback(
        (event, isOpen) => setOpen(isOpen),
        [],
    );

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
                withCredentials: true,
            });
            console.log(response.data.message);
            navigate("/signin");
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
        }
    };

    return (
        <Box>
            <nav className="navbar sticky-top">
                <div className="container-fluid">
                    <Box sx={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                        <Link to={"/"}><img src={logo} /></Link>

                        <Box>
                            <Dropdown sx={{ position: 'relative' }} open={open} onOpenChange={handleOpenChange}>

                                {/* Avatar du top-right */}
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
                                        {...(fullImagePath ? { src: fullImagePath } : {})}
                                        alt="Profile"
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            bgcolor: "#bdbdbd",
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {!fullImagePath && getInitials(profile?.sudoname)}
                                    </Avatar>
                                </MenuButton>

                                {/* Menu déroulant */}
                                <Menu sx={{ padding: '15px' }}>
                                    <MenuItem>
                                        <Box>
                                            <Avatar
                                                {...(fullImagePath ? { src: fullImagePath } : {})}
                                                alt="Profile"
                                                sx={{
                                                    width: 30,
                                                    height: 30,
                                                    marginRight: 1,
                                                    bgcolor: "#bdbdbd",
                                                    color: "white",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {!fullImagePath && getInitials(profile?.sudoname)}
                                            </Avatar>
                                        </Box>

                                        <Box>
                                            <Typography sx={{ fontSize: 'medium', color: 'black' }}>
                                                {profile?.sudoname || "User Name"}
                                            </Typography>
                                            <Typography sx={{ fontSize: 'small' }}>
                                                {profile?.email || "email@example.com"}
                                            </Typography>
                                        </Box>
                                    </MenuItem>

                                    <Box sx={{ width: '100%', borderTop: '1px solid #ccc', margin: '10px 0' }} />

                                    <MenuItem><Typography sx={{ fontSize: 'small' }}>Account</Typography></MenuItem>

                                    <MenuItem><AccountCircleOutlinedIcon /><Link to={"/profile"} style={{ color:'black',textDecoration:'none' }}>&nbsp;Profil settings</Link></MenuItem>

                                    <MenuItem><PhotoLibraryOutlinedIcon /><Link to={"/projectsetting"} style={{ color:'black',textDecoration:'none' }}>&nbsp;Project settings</Link></MenuItem>

                                    <MenuItem><AirplayOutlinedIcon /><Link to={"/portofolio"} style={{ color:'black',textDecoration:'none' }}>&nbsp;My Portofolio</Link></MenuItem>

                                    <Box sx={{ width: '100%', borderTop: '1px solid #ccc', margin: '10px 0' }} />

                                    <MenuItem sx={{ color:'red' }} onClick={handleLogout}><ExitToAppOutlinedIcon />&nbsp;Logout</MenuItem>
                                </Menu>
                            </Dropdown>
                        </Box>
                    </Box>
                </div>
                <Box sx={{ width: '100%', borderTop: '1px solid #ccc', margin: '5px 0' }} />
            </nav>
        </Box>
    );
}
