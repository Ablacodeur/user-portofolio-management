import { Box, Button, CircularProgress } from '@mui/joy';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from "react-router-dom";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CardComponent from '../Card/CardComponent';
import { useDispatch, useSelector } from 'react-redux';
import hero from '../assets/resources/profile-bg.png';
import { setprojectList } from '../store/user-project/project-slice';
import axios from 'axios';

export default function StaticPortofolioPage() {

  const { id } = useParams(); 
  const dispatch =useDispatch();
  const profilList = useSelector((store) => store.PROFILE?.profilList || []);
  const projectList = useSelector((store) => store.PROJECT.projectList);

  useEffect(() => {
  async function loadProjects() {
            const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/getproject`,
            { params: { profil_id: id } }
            );    
        dispatch(setprojectList(res.data));
  }
  loadProjects();
}, []);


  const [expanded, setExpanded] = useState(false);

  // 🔍 Trouver le profil correspondant dans le store
  const profil = useMemo(() => {
    return profilList.find((p) => p.id === Number(id));
  }, [id, profilList]);
   console.log(profil);

  if (!profil) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress size="lg" />
      </Box>
    );
  }
  // Loader si les projets ne sont pas encore chargés
if (projectList.length === 0) {
  return (
    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress size="lg" />
    </Box>
  );
}


  function buildImagePath(img) {
    if (!img) return null;
    if (typeof img !== "string") return null;
    if (img.startsWith("http")) return img;
    return `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}${img.startsWith('/') ? '' : '/'}${img}`;
  }

  const imagePath = buildImagePath(profil.profil_image);
  const toggleExpand = () => setExpanded(!expanded);

  return (
    <Box sx={{ position: 'relative' }}>

      {/* 🖼️ Image hero */}
      <Box
        sx={{
          height: '23vh',
          width: '100%',
          backgroundImage: `url(${hero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 🧍 Image de profil */}
      <Box
        sx={{
          marginLeft: { xs: '30px', sm: '100px', md: '200px', lg: '300px' },
          marginTop: { xs: '-60px', md: '-100px' },
          position: 'absolute',
          zIndex: 1,
          border: '5px solid white',
          borderRadius: '50%',
          width: { xs: '120px', md: '200px' },
          height: { xs: '120px', md: '200px' },
          overflow: 'hidden',
        }}
      >
        {profil.profil_image ? (
          <img
            src={imagePath}
            alt="profil"
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Box sx={{ color: '#777' }}>Aucune image</Box>
        )}
      </Box>

      {/* 🧾 Informations */}
      <Box
        sx={{
          marginTop: '100px',
          marginLeft: { xs: '30px', sm: '100px', md: '200px', lg: '300px' },
        }}
      >
        <h1 style={{ fontSize: '40px' }}>
          {profil.sudoname}
          <br />
          <span style={{ fontSize: '20px', color: '#989494' }}>{profil.job}</span>
        </h1>

        <Button variant="outlined" sx={{ border: '1px solid #989494' }}>
          <EmailOutlinedIcon sx={{ marginRight: '5px' }} />
          <a href={`mailto:${profil.email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {profil.email}
          </a>
        </Button>

        {/* Bio */}
        {profil.about_you && (
          <Box>
            <p
              style={{
                fontSize: '16px',
                color: '#333',
                overflow: expanded ? 'visible' : 'hidden',
                display: expanded ? 'block' : '-webkit-box',
                WebkitLineClamp: expanded ? 'unset' : 4,
                WebkitBoxOrient: 'vertical',
              }}
            >
              <span style={{ color: '#989494' }}>Bio</span>
              <br />
              {profil.about_you}
            </p>

            {profil.about_you.length > 150 && (
              <Button
                variant="plain"
                size="sm"
                onClick={toggleExpand}
              >
                {expanded ? 'Lire moins' : 'Lire plus'}
              </Button>
            )}
          </Box>
        )}

        <hr style={{ width: '100%', marginTop: '20px' }} />

        {/* Projets */}
            {projectList
            .filter(project => project.profil_id === Number(id))
            .map((project, idx) => (
                <CardComponent key={idx} project={project} />
            ))
            }
      </Box>
    </Box>
  );
}
