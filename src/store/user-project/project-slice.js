import { createSlice } from "@reduxjs/toolkit";
export const projectSlice = createSlice({
    name:"projectSlice",
    initialState:{
        projectList:[],
        theProject: {}
    },
    reducers:{
        setprojectList:(currentSlice,action)=>{
            currentSlice.projectList = action.payload;
        },
        setTheProject: (currentSlice, action) => {
            currentSlice.theProject = { ...currentSlice.theProject, ...action.payload };
        },
        addProject:(currentSlice,action)=>{
            currentSlice.projectList.push(action.payload);
        },
        updateProject: (currentSlice, action) => {
            const indexToUpdate = currentSlice.projectList.findIndex(
                (project) => project.id === action.payload.id
            );
            if (indexToUpdate !== -1) {
                currentSlice.projectList[indexToUpdate] = action.payload;
            }
        },
        deleteProject: (currentSlice, action) => {
            currentSlice.projectList = currentSlice.projectList.filter(
                (project) => project.id !== action.payload // Utilisez directement action.payload
            );
        },
        

    
    },

});

export const projectReducer = projectSlice.reducer;
export const { setprojectList, addProject, updateProject, deleteProject, setTheProject } = projectSlice.actions;
