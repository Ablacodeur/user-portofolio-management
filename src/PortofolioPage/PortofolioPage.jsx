import { Box, Button } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import  "./style.module.css";
import hero from '../assets/resources/profile-bg.png'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CardComponent from '../Card/CardComponent';
import { useDispatch, useSelector } from 'react-redux';
import { setprojectList } from '../store/user-project/project-slice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { setError, setUser } from '../store/user-project/userSlice';

export default function PortofolioPage() {
        const projectList = useSelector((store) => store.PROJECT.projectList);
        const user = useSelector((state) => state.USER?.user);
        console.log(user?.email); 
        const dispatch = useDispatch();
        const[page, setPage] = useState('portofolio');
        const navigate = useNavigate();
    
        useEffect(() => {
              const fetchData = async () => {
                try {
                  const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
                  dispatch(setprojectList(response.data));
                } catch (err) {
                  console.error(err);
                }
              };
          
              fetchData();
            }, []);
            useEffect(() => {
              const fetchUser = async () => {
                if (user && user.password) {
                  console.log("Utilisateur déjà défini :", user);
                  return; // Ne pas remplacer l'utilisateur existant
                }
            
                try {
                  const response = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
                    withCredentials: true, // Inclure les cookies de session
                  });
                  console.log("Utilisateur récupéré après GitHub :", response.data);
                  dispatch(setUser(response.data)); // Met à jour le store Redux
                } catch (error) {
                  console.error("Erreur lors de la récupération de l'utilisateur :", error);
                  dispatch(setError("Non authentifié"));
                }
              };
            
              fetchUser();
            }, [dispatch, user]);    
        
    return (
      <Box sx={{ position:'relative' }}>
        <Box
          sx={{
            height: '23vh',
            width: '100%',            
            margin: '0',
            padding: 0, 
            backgroundImage: `url(${hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
        </Box>
        <Link to={"/profile"}>
        <Box sx={{ marginLeft: { xs: '30px', sm: '100px', md: '200px',lg: '300px' },
                marginRight: { xs: '30px', sm: '100px', md: '200px',lg: '300px' },
                marginTop: {xs:'-60px', md:'-100px'},
                position: 'absolute',
                backgroundImage: `url(https://picsum.photos/id/1/200/300)`,
                zIndex: '1' ,
                border: '5px solid white',
                borderRadius: '50%',
                width: {xs:'120px',md:'200px'}, height:{xs:'120px',md:'200px'},
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',

         }}>

        </Box>

        </Link>
        <Box sx={{ marginTop: '100px',marginLeft: { xs: '30px', sm: '100px', md: '200px',lg: '300px' },
         marginRight: { xs: '30px', sm: '100px', md: '200px',lg: '300px' }, 
         gap: '20px',display: 'flex', 
         flexDirection: 'column', alignItems: 'flex-start' }}>
         <h5> Bienvenue, {user?.email}</h5>
         <p>Ceci est votre portfolio personnalisé.</p>
            <h1 style={{ fontSize: '40px',padding:'0px' }}>Trace Adkins
            <br/>
            
            <span style={{ fontSize: '20px', color: '#989494'}}>Rock singer</span>
            </h1>
            <Button variant="outlined" sx={{ 
                border: '1px solid #989494',
                color: '#989494',
                padding: '5px 10px',
             }}>
            <EmailOutlinedIcon sx={{ marginRight: '5px' }} />
                contact
            </Button>
            <p style={{fontSize: '16px' }}>
                <span style={{ color:'#989494'}}>Bio</span>
                <br/>
                A passionate Junior Front-end Developer with extensive experience in HTML, CSS, JavaScript, and React. Proven track record of developing user-friendly interfaces and optimizing
                website performance. Eager to learn and grow in the tech industry.
            </p>
            <hr style={{ width: '100%', border: '1px solid #989494', marginTop: '20px' }} />

        {/* Liste des tâches */}
            {projectList.map((project, id) => (
                <React.Fragment key={id}>
                    {/* Bouton de la carte */}
                    <Button
                     variant="outlined"
                     color="neutral"
                        sx={{
                        width: '100%',
                        height: { xs: '15%' },
                        }}
                    >
                    <CardComponent project={project} page={page}/>
                    </Button>
                    </React.Fragment>
        ))}
        </Box>
      </Box>
    );
  }
