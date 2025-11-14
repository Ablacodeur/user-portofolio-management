import axios from "axios";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setError, setUser } from "../store/user-project/userSlice";
import { useDispatch } from "react-redux";
import { gsap } from "gsap";
import FormatQuoteOutlinedIcon from '@mui/icons-material/FormatQuoteOutlined';
import { Box, Stack, Typography } from "@mui/material";
import NavBar from "../NavBar/NavBar";
import showcase1 from "../assets/resources/chris-ried-ieic5Tq8YMk-unsplash.jpg";
import showcase2 from "../assets/resources/farhat-altaf-cfYWbIZLOF8-unsplash.jpg";
import { SearchBar } from "../SearchBar/SearchBar";
import SlideSection from "../SlideSection/SlideSection";
import Footer from "../Footer/Footer";
import { FilterBar } from "../FilterBar/FilterBar";
import { ScrollTrigger } from "gsap/all";
import { setprofilList } from "../store/user-project/profile-slice";

export default function Browser() {
  const imageContainerRef = useRef(null);
  const titleRef = useRef(null); 
  const typingTextRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

// POUR FECTHER TOUS LES PROFILS DANS LE STORE
  useEffect(() => {
    const fetchProfils = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/profils`, {
          withCredentials: true, 
        });
        dispatch(setprofilList(res.data));
        // console.log("Profils ajoutés au store :", res.data);
      } catch (err) {
        // console.error("Erreur récupération profils :", err);
      }
    };

    fetchProfils();
  }, [dispatch]);

  useEffect(() => {
    // Animation GSAP pour fade-in et fade-out du texte
    gsap.fromTo(
      titleRef.current,
      { opacity: 1 }, 
      {
        opacity: 0, 
        scrollTrigger: {
          trigger: titleRef.current, 
          start: "top top", 
          end: "bottom top", 
          scrub: true, 
        },
      }
    );
  }, []);

  const image1Ref = useRef(null); 
  const image2Ref = useRef(null); 

  useEffect(() => {
    // Animation pour l'image 1 (roule comme un ballon et se déplace vers la gauche)
    gsap.to(image1Ref.current, {
      x: -200, 
      rotation: -360, 
      duration: 2, 
      ease: "power2.out", 
      scrollTrigger: {
        trigger: imageContainerRef.current, 
        start: "top 80%", 
        end: "bottom top", 
        scrub: true, // Synchronise l'animation avec le défilement
      },
    });

    // Animation pour l'image 2 (roule comme un ballon et se déplace vers la droite)
    gsap.to(image2Ref.current, {
      x: 200, 
      rotation: 360, 
      duration: 2, 
      ease: "power2.out", 
      scrollTrigger: {
        trigger: imageContainerRef.current, 
        start: "top 80%", 
        end: "bottom top", 
        scrub: true, 
      },
    });
    // Animation pour les superposer au centre
    gsap.to([image1Ref.current, image2Ref.current], {
      x: 0, 
      rotation: 0, 
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: imageContainerRef.current,
        start: "center center", 
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);
  useEffect(() => {
    const typingElement = typingTextRef.current;

    // Animation GSAP pour l'effet zoom-in
    gsap.fromTo(
      typingElement,
      { scale: 0.8, opacity: 0 }, // Départ : réduit et invisible
      {
        scale: 1, // Taille normale
        opacity: 1, // Complètement visible
        duration: 1, // Durée de l'animation
        ease: "power2.out", // Transition fluide
        scrollTrigger: {
          trigger: typingElement, // Déclencheur : le texte
          start: "top 80%", // L'animation commence lorsque le texte entre dans la vue
          end: "top 50%", // L'animation se termine lorsque le texte atteint 50% de la hauteur de la fenêtre
          scrub: true, // Synchronise l'animation avec le défilement
        },
      }
    );
  }, []);  

  const handleFilter = (category) => {
    console.log("🎯 Catégorie sélectionnée :", category);
    navigate("/filter-browser", { state: { category} });
  };
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #f1eded, #767CE8, #e3e5ed)",
        minHeight: "30vh", 
        position:'static'
      }}
    >
      <NavBar />

      <Box sx={{ marginTop: "100px", textAlign: "center", height: "90vh" }}>
        <Typography
          ref={titleRef}
          variant="h1"
          sx={{
            fontSize: {
              xs: '1.7rem', 
              sm: '3rem', 
              md: '4rem', 
              lg: '6rem',
            },
            textAlign: 'center',
          }}
        >
          Your masterpieces ... all together
        </Typography>      
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
          overflow: "hidden", // empêche les images de dépasser l’écran
        }}
      >
        <Box
          ref={imageContainerRef}
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "100vw", // limite à la largeur de l’écran
            height: { xs: "50vh", md: "100vh" }, // adapte la hauteur selon l’écran
            marginBottom: "10vh",
          }}
        >
          <Box
            component="img"
            ref={image1Ref}
            src={showcase1}
            alt="image 1"
            sx={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translateX(50%) translateY(-50%)",
              width: { xs: "150px", sm: "250px", md: "300px" }, // responsive
              height: { xs: "150px", sm: "250px", md: "300px" },
              borderRadius: "20%",
              maxWidth: "90vw", // empêche de dépasser
            }}
          />
          <Box
            component="img"
            ref={image2Ref}
            src={showcase2}
            alt="image 2"
            sx={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translateX(-150%) translateY(-50%)",
              width: { xs: "150px", sm: "250px", md: "300px" },
              height: { xs: "150px", sm: "250px", md: "300px" },
              borderRadius: "20%",
              maxWidth: "90vw",
            }}
          />
        </Box>
      </Box>


      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
      <Typography
        ref={typingTextRef}
        variant="h5"
        sx={{ textAlign: "center", marginTop: "20px", width: "80%", color: "#041458" }}
      >
        <FormatQuoteOutlinedIcon /> {/* Icône avant le texte */}
        A portofolio is a collection of your best work, showcasing your skills and creativity. It is a powerful tool to demonstrate your expertise and attract potential clients or employers.
      </Typography>      </Box>
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '250px',alignItems: 'center',textAlign: 'center',marginBottom:
      '150px'}}>
        <FilterBar onFilter={handleFilter} />
      </Box>
      <Box sx={{ maxWidth: '100vw', overflowY:'hidden', display: 'flex', justifyContent: 'center',alignItems: 'center',backgroundColor:'#e2e3e3'  }}>
        <SlideSection />
      </Box>
      <Footer />
    </Box>  
  );
}