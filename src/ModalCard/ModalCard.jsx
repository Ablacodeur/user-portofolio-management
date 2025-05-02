import React, { useEffect, useState } from 'react';
import Button from "@mui/joy/Button";
import FormLabel from "@mui/joy/FormLabel";
import { Box,Typography } from "@mui/material";
import CardComponent from "../Card/CardComponent";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import s from "./style.module.css";
import { setprojectList } from '../store/user-project/project-slice';
import AddIcon from '@mui/icons-material/Add';
import FormShema from '../FormShema/FormShema';

export default function ModalCard({ setGlobalAlert }) {
    const [open, setOpen] = React.useState(true);
    const[isedited,setIsedited]=useState(false);
    const [theProject, setTheProject] = React.useState({});
    const [statusName, setStatusName] = React.useState('');
    const [selectedStatus, setSelectedStatus] = React.useState('');
    const dispatch = useDispatch();
    const[page, setPage] = useState('setting');
    const projectList = useSelector((store) => store.PROJECT.projectList);
    const [reload, setReload] = React.useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
          dispatch(setprojectList(response.data));
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchData();
    }, []);
  
    function handleClick(project) {
      setOpen(true);
      if (project) {
        setTheProject(project);
      }
    }
  
    function setChange(e) {
      const { name, value } = e.target;
  
      dispatch(
        setTheProject({
          ...theProject,
          [name]: value,
        })
      );
  
      console.log(`Updated ${name}:`, value);
    }
  
    async function handleDelete(projectId) {
      if (window.confirm('Do you really want to delete the project?')) {
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/projects/${projectId}`);
  
          dispatch(deleteTask(projectId));
          setReload(true);
          setOpen(false);
          setGlobalAlert('delete');
        } catch (error) {
          console.error('Erreur lors de la suppression de la tâche :', error);
        }
      }
    }
  
    const reloadTasks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
        dispatch(setprojectList(response.data));
      } catch (err) {
        console.error('Erreur lors du rechargement des tâches :', err);
      }
    };
  
    useEffect(() => {
      if (reload) {
        reloadTasks();
        setReload(false);
      }
    }, [reload]);
  
    return (
      <React.Fragment>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
            marginTop: '40px',
          }}
        >
          {/* Bouton pour ouvrir le "modal" */}
            <Box>
            <FormLabel sx={{display: 'flex', 
            justifyContent: 'center', 
            width: {xs: '100%', sm: '95%', md: '60%' },
            flexDirection:'column',
            textAlign:'flex-start',
            alignItems:'flex-start',
            fontWeight:'bold',
            fontSize:{xs:'20px', sm:'25px', md:'30px'},
            marginBottom:'30px',
             }}>Project settings</FormLabel>

            <Button
              variant="outlined"
              color="neutral"
              onClick={() => {
                setTheProject({ name: '', description: '', status: '', icon: '' });
                setSelectedStatus('');
                setStatusName('');
                setOpen(!open);
              }}
              sx={{
                display: 'flex',
                height: { xs: '35px', md: '85px' },
                width: { xs: '100%', sm: '600px', md: '600px', lg: '800px' },
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#E1E8FE',
                justifyContent: 'flex-start',
                padding: '3.5px 15px',
                gap: '8px',
                color: 'black',              }}
            >
              <Typography variant="" sx={{ color:'#6466E9',
              fontSize: '15px', fontWeight: 'bold' , gap: '5px'}}>
                <AddIcon  sx={{ }} />
                Add project
              </Typography>
            </Button>            
            {open && (
            <Box
              sx={{
                position: 'relative',
                width: { xs: '100%' },
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '16px 0px',
                boxShadow: 'lg',
                marginTop: '20px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  variant="plain"
                  onClick={() => setOpen(false)}
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 7.5L12.5 12.5"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12.5 7.5L7.5 12.5"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </Button>
              </Box>
  
              {/* Formulaire */}
              <FormShema 
                      theProject={theProject}
                      onChange={(e) =>
                        setTheProject({ ...theProject, [e.target.name]: e.target.value })
                      }                   
              />

            </Box>
          )}

            </Box>
            {/* Liste des tâches */}
            {projectList.map((project, id) => (
              <React.Fragment key={id}>
                {/* Bouton de la carte */}
                <Button
                  variant="outlined"
                  color="neutral"
                  onClick={() => {
                    setTheProject(project); 
                    setIsedited(isedited === id ? null : id); // Ouvre ou ferme la carte cliquée
                  }}
                  sx={{
                    width: { xs: '100%', sm: '600px', md: '600px', lg: '800px' },
                    height: { xs: '15%' },
                  }}
                >
                  <CardComponent project={project} page={page} />
                </Button>

                {/* Contenu conditionnel du "modal" sous la carte */}
                {isedited === id && (
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      padding: '16px',
                      boxShadow: 'lg',
                      marginTop: '10px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Button
                        variant="plain"
                        onClick={() => setIsedited(null)} // Ferme le contenu
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.5 7.5L12.5 12.5"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M12.5 7.5L7.5 12.5"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </Button>
                    </Box>

                    {/* Formulaire */}
                    <FormShema 
                      theProject={theProject}
                      onChange={(e) =>
                        setTheProject({ ...theProject, [e.target.name]: e.target.value })
                      }
                    />
                  </Box>
                )}
              </React.Fragment>
            ))}
        </Box>
      </React.Fragment>
    );
  }