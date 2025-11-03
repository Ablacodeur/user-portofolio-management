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

  // ✅ Récupération de l'utilisateur connecté (GitHub ou local)
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

  // ✅ Fetch profil + projets quand userID est dispo
  useEffect(() => {
    if (!userID) {
      console.log("⏳ En attente de userID...");
      return;
    }

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

  // ✅ Construit le chemin complet de l'image
  const imagePath = profile?.profil_image
    ? (profile.profil_image.startsWith('http')
        ? profile.profil_image
        : `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}${profile.profil_image.startsWith('/') ? '' : '/'}${profile.profil_image}`)
    : null;

  console.log("🖼️ ImagePath utilisé :", imagePath);

  // ✅ Affiche un spinner global pendant le chargement initial
  if (isLoadingData) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress size="lg" />
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          height: '23vh',
          width: '100%',
          backgroundImage: `url(${hero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

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
                console.warn("❌ Erreur de chargement image :", e.target.src);
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

        <p style={{ fontSize: '16px' }}>
          <span style={{ color: '#989494' }}>Bio</span>
          <br />
          {profile.about_you}
        </p>

        <hr style={{ width: '100%', border: '1px solid #989494', marginTop: '20px' }} />

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
