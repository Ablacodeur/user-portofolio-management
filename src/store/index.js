import { configureStore } from "@reduxjs/toolkit";
import { projectReducer } from "./user-project/project-slice";
import userReducer from "./user-project/userSlice";

export const store = configureStore({
  reducer: {
    PROJECT: projectReducer,
    USER: userReducer,
  },
});
