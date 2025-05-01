import { configureStore } from "@reduxjs/toolkit";
import { projectReducer } from "./user-project/project-slice";

export const store = configureStore({
  reducer: {
    PROJECT: projectReducer,
  },
});
