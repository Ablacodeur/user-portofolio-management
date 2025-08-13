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
export default function Browser() {
  const imageContainerRef = useRef(null);
  const titleRef = useRef(null); 

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
        <Typography ref={titleRef} variant="h1">Your masterpieces ... all together</Typography>
      </Box>


      <Box //box des images 
        sx={{
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          minHeight: "300px", 
        }}
      >
      <Box
        ref={imageContainerRef}
        sx={{
          position: "relative", 
          width: "100%", 
          height: "80vh",
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
              bottom: "50%", 
              left: "50%", 
              transform: "translate(50%, -50%)", 
              width: "400px",
              height: "400px",
              borderRadius: "20%", 
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
                  bottom: "50%", 

                  left: "50%", 
                  transform: "translate(-150%, -50%)", 
                  width: "400px",
                  height: "400px",
                  borderRadius: "20%", 
                  }}
                />

      </Box>
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <Typography variant="h5" sx={{ textAlign: "center", marginTop: "20px", width: "80%", color: "#041458" }}>
           <FormatQuoteOutlinedIcon /> A portfolio is a museum of your work, with past tech stacks, case studies, and your work history therefore we make sure to showcase your work
        </Typography>
      </Box>
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '250px',alignItems: 'center',textAlign: 'center',marginBottom:
      '150px'}}>
        <FilterBar/>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center',alignItems: 'center',backgroundColor:'#e2e3e3'  }}>
        <SlideSection />
      </Box>
      <Footer />
    </Box>  
  );
}