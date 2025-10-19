import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import art1 from "../assets/resources/istockphoto-1390721506-612x612-removebg-preview.png";
import art2 from "../assets/resources/programming-coding-icon-logo-design-template-vector-removebg-preview.png";
import art3 from "../assets/resources/singing-contest-logo-vector-260nw-2281182489-removebg-preview.png";
import art4 from "../assets/resources/téléchargement-removebg-preview.png";


gsap.registerPlugin(ScrollTrigger);

export default function SlideSection() {
  const imageBoxRef = useRef(null); 
  useEffect(() => {
    // Animation GSAP pour zoom-in et zoom-out
    gsap.fromTo(
      imageBoxRef.current,
      { scale: 0.8, opacity: 0.3 }, 
      {
        scale: 1,
        opacity: 1,
        duration: 0.3, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageBoxRef.current, 
          start: "top 80%", 
        },
      }
    );
  }, []);

  return (
   
      <Box
        sx={{
          width: "100%",
          display: "flex",
          height: "20vh",
          transformOrigin: "center",
        }}
      >
        <Box ref={imageBoxRef} sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
          <img src={art1} style={{ width:'150px', height:"150px",borderRadius:'50%' }}  alt="nature 2" />
          <img src={art2} style={{ width:'150px', height:"150px",borderRadius:'50%' }} alt="nature 3" />
          <img src={art3} style={{width:'150px', height:"150px",borderRadius:'50%'  }} alt="nature 4" />
          <img src={art4} style={{ width:'150px', height:"150px",borderRadius:'50%'  }} alt="nature 5" />
        </Box>
      </Box>
    
  );
}