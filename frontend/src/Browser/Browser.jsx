import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gsap } from "gsap";
import FormatQuoteOutlinedIcon from '@mui/icons-material/FormatQuoteOutlined';
import { Box, Typography } from "@mui/material";

import NavBar from "../NavBar/NavBar";

import showcase1 from "../assets/resources/muhammad-shabraiz-MixC8-S9RWs-unsplash.jpg";
import showcase2 from "../assets/resources/alvaro-montoro-UCa69bqJk-c-unsplash.jpg";
import showcase3 from "../assets/resources/afrian-e-prasetyo-IrYEcfFmOc0-unsplash.jpg";
import showcase4 from "../assets/resources/libre-clip-art-zKEkwZiy9Ps-unsplash.jpg";

import Footer from "../Footer/Footer";
import { FilterBar } from "../FilterBar/FilterBar";
import { ScrollTrigger } from "gsap/all";
import { setprofilList } from "../store/user-project/profile-slice";
import RemotePage from "../RemotePage/RemotePage";

gsap.registerPlugin(ScrollTrigger);

export default function Browser() {
  const imageContainerRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const typingTextRef = useRef(null);

  // 4 images refs
  const img1 = useRef(null);
  const img2 = useRef(null);
  const img3 = useRef(null);
  const img4 = useRef(null);

  // Fetch profils
  useEffect(() => {
    const fetchProfils = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/profils`, {
          withCredentials: true,
        });
        dispatch(setprofilList(res.data));
      } catch (err) {}
    };
    fetchProfils();
  }, [dispatch]);

  // Fade title
  useEffect(() => {
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

  // Animation des 4 cercles
  useEffect(() => {
    const circles = [img1.current, img2.current, img3.current, img4.current];

    // Déplacement latéral (deux à droite, deux à gauche)
    gsap.to(img1.current, {
      x: -200,
      rotation: -360,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: imageContainerRef.current,
        start: "top 100%",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(img2.current, {
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

    gsap.to(img3.current, {
      x: -150,
      rotation: -360,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: imageContainerRef.current,
        start: "top 80%",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(img4.current, {
      x: 150,
      rotation: 360,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: imageContainerRef.current,
        start: "top 100%",
        end: "bottom top",
        scrub: true,
      },
    });

    // Retour des 4 cercles au centre
    gsap.to(circles, {
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

  // typing animation
  useEffect(() => {
    gsap.fromTo(
      typingTextRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: typingTextRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: true,
        },
      }
    );
  }, []);

  const handleFilter = (category) => {
    navigate("/filter-browser", { state: { category } });
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #f1eded, #767CE8, #e3e5ed)",
        minHeight: "30vh"
      }}
    >
      <NavBar />

      {/* Title */}
      <Box sx={{ marginTop: "100px", textAlign: "center", height: "35vh" }}>
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
          }}
        >
          Your masterpieces ... all together
        </Typography>
      </Box>

      {/* CIRCLES ANIMATION */}
      <Box sx={{ display: "flex", justifyContent: "center", overflow: "hidden" }}>
        <Box
          ref={imageContainerRef}
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "60vh", md: "80vh" },
            marginBottom: "10vh",
          }}
        >
          {/* Circle images */}
          {[ 
            { ref: img1, src: showcase1, top: "22%", left: "35%" }, 
            { ref: img2, src: showcase2, top: "58%", left: "65%" }, 
            { ref: img3, src: showcase3, top: "38%", left: "75%" }, 
            { ref: img4, src: showcase4, top: "45%", left: "25%" }          
            ].map((img, i) => (
            <Box
              key={i}
              component="img"
              ref={img.ref}
              src={img.src}
              sx={{
                position: "absolute",
                top: img.top,
                left: img.left,
                transform: "translate(-50%, -50%)",
                width: { xs: "120px", sm: "160px", md: "200px" },
                height: { xs: "120px", sm: "160px", md: "200px" },
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0px 10px 25px rgba(0,0,0,0.25)",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* TEXT */}
      <Box sx={{ textAlign: "center" }}>
        <Typography
          ref={typingTextRef}
          variant="h5"
          sx={{ width: "80%", margin: "auto", color: "#041458" }}
        >
          <FormatQuoteOutlinedIcon />
          A portofolio is a collection of your best work, showcasing your skills...
        </Typography>
      </Box>

      {/* Filter */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '250px', marginBottom: '150px' }}>
        <FilterBar onFilter={handleFilter} />
      </Box>

      <Box sx={{ maxWidth: '100vw', backgroundColor:'#ffffff', display: 'flex', justifyContent:'center' }}>
        <RemotePage />
      </Box>


      <Footer />
    </Box>
  );
}
