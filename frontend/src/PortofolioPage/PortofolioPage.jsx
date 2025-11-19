import { Box, Button, CircularProgress } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import "./style.module.css";
import hero from '../assets/resources/profile-bg.png';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CardComponent from '../Card/CardComponent';
import { useDispatch, useSelector } from 'react-redux';
import { setprojectList } from '../store/user-project/project-slice';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setError, setUser } from '../store/user-project/userSlice';
import { setprofilList, setTheProfil } from '../store/user-project/profile-slice';

export default function PortofolioPage() {
  const projectList = useSelector((store) => store.PROJECT.projectList);
  const user = useSelector((state) => state.USER?.user);
  const userID = user?.id;
  const profile = useSelector((store) => store.PROFILE.theProfil);
  const dispatch = useDispatch();

  const [page, setPage] = useState('portofolio');
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [expanded, setExpanded] = useState(false);
  console.log("PROFILE IMAGE TYPE =>", typeof profile.profil_image, profile.profil_image);


  useEffect(() => {
    const fetchUser = async () => {
      if (user && user.id) return;
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
          withCredentials: true,
        });
        dispatch(setUser(response.data));
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        dispatch(setError("Non authentifié"));
      }
    };
    fetchUser();
  }, [dispatch, user]);

  useEffect(() => {
    if (!userID) return;
    const fetchData = async () => {
      try {
        setIsLoadingData(true);
        const profil_response = await axios.get(
          `${import.meta.env.VITE_API_URL}/getprofil?user_id=${userID}`
        );
        const projects_response = await axios.get(
          `${import.meta.env.VITE_API_URL}/getproject?user_id=${userID}`
        );

        dispatch(setTheProfil(profil_response.data[0]));
        dispatch(setprofilList(profil_response.data));
        dispatch(setprojectList(projects_response.data));
      } catch (err) {
        console.error("Erreur lors du fetch profil/projets :", err);
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchData();
  }, [userID, dispatch]);

  function buildImagePath(img) {
    if (!img) return null;                   
    if (img instanceof File) return null;    
    if (typeof img !== "string") return null; 

    // cas: URL Cloudinary
    if (img.startsWith("http")) return img;

    // cas: chemin backend
    return `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}${img.startsWith('/') ? '' : '/'}${img}`;
  }

  const imagePath = buildImagePath(profile?.profil_image);

  if (isLoadingData) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress size="lg" />
      </Box>
    );
  }

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <Box sx={{ position: 'relative' }}>
      {/* 🖼️ Image de couverture */}
      <Box
        sx={{
          height: '23vh',
          width: '100%',
          backgroundImage: `url(${hero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 🧍‍♂️ Avatar */}
      <Link to={"/profile"}>
        <Box
          sx={{
            marginLeft: { xs: '30px', sm: '100px', md: '200px', lg: '300px' },
            marginRight: { xs: '30px', sm: '100px', md: '200px', lg: '300px' },
            marginTop: { xs: '-60px', md: '-100px' },
            position: 'absolute',
            zIndex: 1,
            border: '5px solid white',
            borderRadius: '50%',
            width: { xs: '120px', md: '200px' },
            height: { xs: '120px', md: '200px' },
            overflow: 'hidden',
            backgroundColor: '#f4f4f4',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {profile?.profil_image ? (
            <img
              key={profile.profil_image}
              src={imagePath}
              alt="profile"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'opacity 0.4s ease',
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <Box
              sx={{
                fontSize: { xs: '12px', md: '16px' },
                color: '#777',
                textAlign: 'center',
                padding: '10px',
              }}
            >
              Aucun profil image
            </Box>
          )}
        </Box>
      </Link>

      {/* 🧾 Informations principales */}
      <Box
        sx={{
          marginTop: '100px',
          marginLeft: { xs: '30px', sm: '100px', md: '200px', lg: '300px' },
          marginRight: { xs: '30px', sm: '100px', md: '200px', lg: '300px' },
          gap: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <h1 style={{ fontSize: '40px' }}>
          {profile.sudoname}
          <br />
          <span style={{ fontSize: '20px', color: '#989494' }}>{profile.job}</span>
        </h1>

        <Button
          variant="outlined"
          sx={{
            border: '1px solid #989494',
            color: '#989494',
            padding: '5px 10px',
          }}
        >
          <EmailOutlinedIcon sx={{ marginRight: '5px' }} />
          <a
            href={`mailto:${profile.email}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {profile.email}
          </a>
        </Button>

        {/* ✅ Bio dynamique avec "Lire plus / Lire moins" */}
        {profile.about_you && (
          <Box>
            <p
              style={{
                fontSize: '16px',
                color: '#333',
                overflow: expanded ? 'visible' : 'hidden',
                display: expanded ? 'block' : '-webkit-box',
                WebkitLineClamp: expanded ? 'unset' : 4,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis',
                whiteSpace: 'pre-line',
                transition: 'all 0.3s ease',
              }}
            >
              <span style={{ color: '#989494' }}>Bio</span>
              <br />
              {profile.about_you}
            </p>

            {profile.about_you.length > 150 && (
              <Button
                variant="plain"
                color="primary"
                size="sm"
                onClick={toggleExpand}
                sx={{
                  mt: -1,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  padding: 0,
                }}
              >
                {expanded ? 'Lire moins' : 'Lire plus'}
              </Button>
            )}
          </Box>
        )}

        <hr style={{ width: '100%', border: '1px solid #989494', marginTop: '20px' }} />

        {/* 🎵 Liste des projets */}
        <Box sx={{ marginBottom: '50px', width: '100%' }}>
          {projectList.map((project, id) => (
            <Button
              key={id}
              variant="outlined"
              color="neutral"
              sx={{ width: '100%', height: { xs: '15%' } }}
            >
              <CardComponent project={project} page={page} loading="lazy" />
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
