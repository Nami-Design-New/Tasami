import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./slices/languageSlice";
import authRole from "./slices/authRole";

export const store = configureStore({
  reducer: {
    language: languageSlice,
    authRole,
  },
});
