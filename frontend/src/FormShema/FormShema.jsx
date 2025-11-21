import React, { useEffect, useState } from 'react';
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { Box, Typography } from "@mui/material";
import { Avatar, Textarea, CircularProgress } from "@mui/joy";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject, setprojectList, setTheProject } from '../store/user-project/project-slice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import imageCompression from "browser-image-compression";

export default function FormShema({ id }) {
  const dispatch = useDispatch();
  const projectList = useSelector((store) => store.PROJECT.projectList);
  const theProject = useSelector((store) => store.PROJECT.theProject);
  const user = useSelector((state) => state.USER?.user);
  const profil = useSelector((store) => store.PROFILE.theProfil);   // 🔥 AJOUTÉ
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

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
    } else {
      dispatch(
        setTheProject({
          ...theProject,
          [name]: value,
        })
      );
    }
  }

  async function handleDelete(projectId) {
    if (window.confirm("Do you really want to delete this project?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/projects/${projectId}`);
        dispatch(deleteProject(projectId));
        navigate('/projectsetting');
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();

      // 🔥 Compression si nouvelle image
      if (theProject.project_image instanceof File) {
        const compressedFile = await imageCompression(theProject.project_image, {
          maxSizeMB: 0.6,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        });
        formData.append("project_image", compressedFile);
      }

      // 🔥 Ajout de TOUS les champs sauf project_image
      for (const key in theProject) {
        if (key !== "project_image") {
          formData.append(key, theProject[key]);
        }
      }

      // 🔥 user_id obligatoire
      const userId = Array.isArray(user?.id) ? user.id[0] : user?.id;
      formData.append("user_id", parseInt(userId, 10));

      // 🔥 AJOUT profil_id obligatoire (MANQUAIT)
      formData.append("profil_id", parseInt(profil.id, 10));

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/projects`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Projet modifié avec succès :", response.data);
      navigate("/portofolio");

    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    } finally {
      setIsLoading(false);
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
            width: { xs: '100%', sm: '600px', md: '600px', lg: '800px' },
            margin: '0 auto',
          }}
        >
          {/* IMAGE */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '40px',
              flexDirection: 'column',
              width: '100%',
              padding: '20px',
              backgroundColor: '#E3E8EF',
              border: '1px solid #ccc',
            }}
          >
            <Avatar sx={{ width: '40px', height: '40px' }} />
            <Typography level="h7" fontSize="small">
              Image must be 256 x 256 pixels - max 2MB
            </Typography>

            <Button
              variant="contained"
              component="label"
              sx={{
                backgroundColor: '#ffffff',
                color: 'black',
                padding: '10px',
                borderRadius: '5px',
                fontWeight: 'bold',
              }}
            >
              <CloudUploadOutlinedIcon />
              <span style={{ marginLeft: '5px' }}>Upload Project Image</span>
              <Input
                type="file"
                name="project_image"
                accept="image/*"
                onChange={setChange}
                style={{ display: 'none' }}
              />
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#ffffff',
                color: '#DD524D',
              }}
            >
              <DeleteForeverOutlinedIcon />
              Delete Image
            </Button>
          </Box>

          {/* INPUTS */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: '20px',
            }}
          >
            <Box>
              <FormLabel>Project Name</FormLabel>
              <Input
                type="text"
                value={theProject?.project_name || ''}
                onChange={setChange}
                name="project_name"
              />
            </Box>

            <Box>
              <FormLabel>Demo URL</FormLabel>
              <Input
                type="text"
                value={theProject?.demo_url || ''}
                onChange={setChange}
                name="demo_url"
              />
            </Box>

            <Box>
              <FormLabel>Repository URL</FormLabel>
              <Input
                type="text"
                value={theProject?.repo_url || ''}
                onChange={setChange}
                name="repo_url"
                disabled
              />
            </Box>
          </Box>

          <Textarea
            name="description"
            minRows={5}
            value={theProject?.description || ''}
            onChange={setChange}
            placeholder="Enter a short introduction..."
          />

          {/* BUTTONS */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              type="submit"
              disabled={isLoading}
              sx={{
                width: '150px',
                backgroundColor: '#6466E9',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              {isLoading ? (
                <>
                  <CircularProgress size="sm" sx={{ color: 'white' }} />
                  <Typography sx={{ fontSize: '13px', color: 'white' }}>Saving…</Typography>
                </>
              ) : (
                <>
                  <CheckCircleIcon />
                  Save
                </>
              )}
            </Button>

            <Button
              onClick={() => handleDelete(theProject.id)}
              variant="contained"
              sx={{
                width: '100px',
                backgroundColor: '#E3E8EF',
                color: 'black',
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
