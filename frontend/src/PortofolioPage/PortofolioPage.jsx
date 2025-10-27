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
import { setprofilList, setTheProfil } from '../store/user-project/profile-slice';

export default function PortofolioPage() {
        const projectList = useSelector((store) => store.PROJECT.projectList);
        const user = useSelector((state) => state.USER?.user);
        const userID=useSelector((state) => state.USER?.user.id);
        const profile= useSelector((store)=>store.PROFILE.theProfil)
        console.log("Image de profile :", profile.profil_image);
        // console.log("URL complète de l'image :", `/uploads/${profile?.profil_image}`);
        console.log(userID);
        
        console.log(user?.email); 
        const dispatch = useDispatch();
        const[page, setPage] = useState('portofolio');
        const navigate = useNavigate();


          // chemin complet de l'image de profil
          const imagePath = profile?.profil_image
          ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}${profile.profil_image.startsWith('/') ? '' : '/'}${profile.profil_image}`
          : null;
        
        console.log("Image Path:", imagePath); 

        useEffect(() => {
              const fetchData = async () => {
                try {
                  const profil_response = await axios.get(`${import.meta.env.VITE_API_URL}/getprofil?user_id=${userID}` );
                  const projects_response = await axios.get(`${import.meta.env.VITE_API_URL}/getproject?user_id=${userID}` );

                  // console.log("Liste des profils récupérée :", profil_response.data[0]);
                  dispatch(setTheProfil(profil_response.data[0]));
                  dispatch(setprofilList(profil_response.data));
                  dispatch(setprojectList(projects_response.data));
                  // console.log("Liste des projets du store Redux :", projects_response.data);
                } catch (err) {
                  console.error(err);
                }
              };
          
              fetchData();
            }, []);
            
            useEffect(() => {
            const fetchUser = async () => {
              // Si on a déjà un user.id, on ne relance pas
              if (user && user.id) return;

              try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
                  withCredentials: true,
                });
                console.log("Utilisateur récupéré après GitHub :", response.data);
                dispatch(setUser(response.data));
              } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur :", error);
                dispatch(setError("Non authentifié"));
              }
            };

            fetchUser();
            // dépend uniquement du dispatch (qui est stable)
          }, [dispatch]);

    return (
      <Box sx={{ position:'relative'}}>
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
                backgroundImage: imagePath ? `url(${imagePath})` : 'none',
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
        <Box sx={{ marginTop: '100px', marginLeft: { xs: '30px', sm: '100px', md: '200px',lg: '300px' },
         marginRight: { xs: '30px', sm: '100px', md: '200px',lg: '300px' }, 
         gap: '20px',display: 'flex', 
         flexDirection: 'column', alignItems: 'flex-start'}}>
       
         <p>Ceci est votre portfolio personnalisé.</p>
            <h1 style={{ fontSize: '40px',padding:'0px' }}>{profile.sudoname}
            <br/>
            
            <span style={{ fontSize: '20px', color: '#989494'}}>{profile.job}</span>
            </h1>
            <Button variant="outlined" sx={{ 
                border: '1px solid #989494',
                color: '#989494',
                padding: '5px 10px',
             }}>
            <EmailOutlinedIcon sx={{ marginRight: '5px' }} />
            <a href={`mailto:${profile.email}`} mailto target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              {profile.email}
            </a>
            
            </Button>
            <p style={{fontSize: '16px' }}>
                <span style={{ color:'#989494'}}>Bio</span>
                <br/>
                {profile.about_you}
            </p>
            <hr style={{ width: '100%', border: '1px solid #989494', marginTop: '20px' }} />

        {/* Liste des tâches */}
        <Box sx={{ marginBottom:'50px',width: '100%',}}>
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
      </Box>
    );
  }
