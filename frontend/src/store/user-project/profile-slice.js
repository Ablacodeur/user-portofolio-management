import { createSlice } from "@reduxjs/toolkit";
export const profileSlice = createSlice({
    name:"profileSlice",
    initialState:{
        profilList:[],
        theProfil: {}
    },
    reducers:{
        setprofilList:(currentSlice,action)=>{
            currentSlice.profilList = action.payload;
        },
        setTheProfil: (currentSlice, action) => {
            currentSlice.theProfil = { ...currentSlice.theProfil, ...action.payload };
        },
        addProfil:(currentSlice,action)=>{
            currentSlice.profilList.push(action.payload);
        },
        updateProfil: (currentSlice, action) => {
            const indexToUpdate = currentSlice.profilList.findIndex(
                (profil) => profil.id === action.payload.id
            );
            if (indexToUpdate !== -1) {
                currentSlice.profilList[indexToUpdate] = action.payload;
            }
        },
    
    },

});

export const profilReducer = profileSlice.reducer;
export const { setprofilList, addProfil, updateProfil,setTheProfil } = profileSlice.actions;
