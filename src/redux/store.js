import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./slices/languageSlice";
import authRole from "./slices/authRole";
import filterReducer from "./slices/performanceFilter";

export const store = configureStore({
  reducer: {
    language: languageSlice,
    authRole,
    filter: filterReducer,
  },
});
