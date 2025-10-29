import React, { useEffect, useState } from 'react';
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { Box, Typography } from "@mui/material";
import { Avatar, Textarea } from "@mui/joy";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject, setprojectList, setTheProject } from '../store/user-project/project-slice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import imageCompression from "browser-image-compression"; // ✅ ajout compression

export default function FormShema({ id }) {
  const dispatch = useDispatch();
  const projectList = useSelector((store) => store.PROJECT.projectList);
  const theProject = useSelector((store) => store.PROJECT.theProject);
  const user = useSelector((state) => state.USER?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== null) {
      const projectToEdit = projectList.find((project) => project.id === id);
      if (projectToEdit) {
        dispatch(setTheProject(projectToEdit));
      }
    } else {
      dispatch(setTheProject({}));
    }
  }, [id, dispatch, projectList]);

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

  async function handleDelete(projectId) {
    if (window.confirm("Do you really want to delete this project?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/projects/${projectId}`);
        dispatch(deleteProject(projectId));
        console.log("Projet supprimé avec succès !");
        navigate('/projectsetting');
      } catch (error) {
        console.error("Erreur lors de la suppression du projet :", error);
      }
    }
  }

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const formData = new FormData();

            // ✅ Compression avant envoi (si nouvelle image ajoutée)
            if (theProject.project_image instanceof File) {
              console.log("Compression de l'image du projet en cours...");
              const compressedFile = await imageCompression(theProject.project_image, {
                maxSizeMB: 0.6, // ~600 Ko max
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

            // Ajoutez toutes les propriétés sauf image (déjà compressée)
            for (const key in theProject) {
              if (key !== "project_image") {
                formData.append(key, theProject[key]);
              }
            }

            // Ajoutez l'ID utilisateur
            formData.append(
              "user_id",
              parseInt(Array.isArray(user?.id) ? user.id[0] : user?.id, 10)
            );

            const response = await axios.post(
              `${import.meta.env.VITE_API_URL}/projects`,
              formData,
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            console.log("✅ Projet modifié avec succès :", response.data);
            navigate("/portofolio");
          } catch (error) {
            console.error("❌ Erreur lors de la soumission :", error);
          }
        }}
      >
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
            width: { xs: '100%', sm: '600px', md: '600px', lg: '800px' },
            margin: '0 auto',
          }}
        >
          {/* section image */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '40px',
              flexDirection: 'column',
              width: { xs: '100%', sm: '100%', md: '100%' },
              borderRadius: '10px',
              padding: '20px',
              backgroundColor: '#E3E8EF',
              border: '1px solid #ccc',
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
                  component="span"
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
                value={theProject?.project_name || ''}
                onChange={setChange}
                name="project_name"
                disabled
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
                value={theProject?.demo_url || ''}
                onChange={setChange}
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
                value={theProject?.repo_url || ''}
                onChange={setChange}
                name="repo_url"
                disabled
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
            value={theProject?.description || ''}
            onChange={setChange}
            placeholder="Enter a short introduction..."
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
            <Button
              variant="contained"
              type="submit"
              sx={{
                display: 'flex',
                width: '100px',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px',
                padding: '10px',
                gap: '5px',
                borderRadius: '5px',
                fontWeight: 'bold',
                backgroundColor: '#6466E9',
                color: 'white',
                marginLeft: 'auto',
              }}
            >
              <AddOutlinedIcon />
              Save
            </Button>

            <Button
              onClick={() => handleDelete(theProject.id)}
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
                boxShadow: '1px 1px 1px #ccc',
                color: 'black',
                marginLeft: 'auto',
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
