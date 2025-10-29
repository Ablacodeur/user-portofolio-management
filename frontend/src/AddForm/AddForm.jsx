import React, { useState } from 'react';
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { Box, Typography } from "@mui/material";
import { Avatar, Textarea, CircularProgress } from "@mui/joy";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import { setprojectList, setTheProject } from '../store/user-project/project-slice';
import axios from 'axios';
import imageCompression from "browser-image-compression";

export default function AddForm() {
  const dispatch = useDispatch();
  const projectList = useSelector((store) => store.PROJECT.projectList);
  const user = useSelector((state) => state.USER?.user);
  const theProject = useSelector((store) => store.PROJECT.theProject);

  const [isLoading, setIsLoading] = useState(false); // ✅ état de chargement

  function setChange(e) {
    const { name, value, files } = e.target;
    if (e.target.type === "file") {
      dispatch(
        setTheProject({
          ...theProject,
          [name]: files[0],
        })
      );
      console.log("Fichier sélectionné :", files[0]);
    } else {
      dispatch(
        setTheProject({
          ...theProject,
          [name]: value,
        })
      );
      console.log(`Updated: ${name} = ${value}`);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true); // ✅ active le spinner
    try {
      const formData = new FormData();

      // ✅ Compression avant envoi
      if (theProject.project_image instanceof File) {
        console.log("Compression de l'image du projet en cours...");
        const compressedFile = await imageCompression(theProject.project_image, {
          maxSizeMB: 0.6,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        });
        console.log(
          "Avant :", (theProject.project_image.size / 1024 / 1024).toFixed(2),
          "MB | Après :", (compressedFile.size / 1024 / 1024).toFixed(2),
          "MB"
        );
        formData.append("project_image", compressedFile);
      }

      // Ajout des autres champs
      for (const key in theProject) {
        if (key !== "project_image") {
          formData.append(key, theProject[key]);
        }
      }

      // Ajout de l'ID utilisateur
      formData.append(
        "user_id",
        parseInt(Array.isArray(user?.id) ? user.id[0] : user?.id, 10)
      );

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/projects`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("✅ Projet ajouté :", response.data);
      dispatch(setprojectList([...projectList, response.data]));
      dispatch(setTheProject(response.data));
      alert("Projet ajouté avec succès !");
    } catch (error) {
      console.error("❌ Erreur lors de la soumission :", error);
      alert("Erreur lors de la soumission du projet.");
    } finally {
      setIsLoading(false); // ✅ désactive le spinner
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            flexDirection: 'column',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            height: 'auto',
            width: { xs: '100%', sm: '600px', md: '600px', lg: '800px' },
            margin: '0 auto',
          }}
        >
          {/* image section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '40px',
              flexDirection: 'column',
              width: '100%',
              borderRadius: '10px',
              padding: '20px',
              backgroundColor: '#E3E8EF',
              border: '1px solid #ccc',
              height: '25vh',
              boxShadow: '0px 0.2px 0px #ccc',
            }}
          >
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '20px',
                  flexDirection: 'column',
                }}
              >
                <Avatar sx={{ width: '40px', height: '40px' }} />
                <Typography level="h7" fontSize="small">
                  Image must be 256 x 256 pixels - max 2MB
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '10px',
                  flexDirection: 'row',
                  width: '100%',
                  padding: { xs: '5px', sm: '10px' },
                  borderRadius: '10px',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      backgroundColor: '#ffffff',
                      color: 'black',
                      padding: '10px',
                      borderRadius: '5px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      width: { xs: '130px', sm: '180px' },
                      fontSize: '10.5px',
                      textWrap: 'nowrap',
                    }}
                  >
                    <CloudUploadOutlinedIcon />
                    <span style={{ marginLeft: '5px' }}>Upload Project Image</span>
                    <Input
                      type="file"
                      accept="image/*"
                      name="project_image"
                      onChange={setChange}
                      style={{ display: 'none' }}
                    />
                  </Button>
                </Box>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#ffffff',
                    padding: '0px',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    width: { xs: '130px', sm: '180px' },
                    color: '#DD524D',
                    fontSize: '10.5px',
                    textWrap: 'nowrap',
                  }}
                >
                  <DeleteForeverOutlinedIcon />
                  Delete Image
                </Button>
              </Box>
            </Box>
          </Box>

          {/* champs texte */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: '20px',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <FormLabel>Project Name</FormLabel>
              <Input
                type="text"
                onChange={setChange}
                placeholder="Enter project name"
                name="project_name"
                sx={{
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <FormLabel>Demo URL</FormLabel>
              <Input
                type="text"
                onChange={setChange}
                placeholder="Enter demo URL"
                name="demo_url"
                sx={{
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <FormLabel>Repository URL</FormLabel>
              <Input
                type="text"
                onChange={setChange}
                placeholder="Enter repo URL"
                name="repo_url"
                sx={{
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </Box>
          </Box>

          <Textarea
            name="description"
            aria-label="minimum height"
            minRows={5}
            placeholder="Enter a short introduction..."
            onChange={setChange}
            sx={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxShadow: '2px 2px 2px #ccc',
            }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '5px',
              marginLeft: 'auto',
            }}
          >
            {/* ✅ Bouton avec spinner “Saving…” */}
            <Button
              variant="contained"
              type="submit"
              disabled={isLoading}
              sx={{
                display: 'flex',
                width: '150px',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px',
                padding: '10px',
                gap: '8px',
                borderRadius: '5px',
                fontWeight: 'bold',
                backgroundColor: '#6466E9',
                color: 'white',
                marginLeft: 'auto',
              }}
            >
              {isLoading ? (
                <>
                  <CircularProgress size="sm" thickness={2} sx={{ color: 'white' }} />
                  <Typography sx={{ fontSize: '13px', color: 'white' }}>Saving…</Typography>
                </>
              ) : (
                <>
                  <CheckCircleIcon />
                  Add
                </>
              )}
            </Button>

            <Button
              variant="contained"
              sx={{
                display: 'flex',
                width: '100px',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px',
                padding: '10px',
                gap: '5px',
                borderRadius: '5px',
                backgroundColor: '#E3E8EF',
                color: 'black',
                boxShadow: '1px 1px 1px #ccc',
              }}
            >
              <DeleteOutlinedIcon />
              Remove
            </Button>
          </Box>
        </FormControl>
      </form>
    </div>
  );
}
