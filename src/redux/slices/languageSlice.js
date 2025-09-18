import { createSlice } from "@reduxjs/toolkit";

const initialLang = localStorage.getItem("i18nextLng") || "ar";

const language = createSlice({
  name: "language",

  initialState: {
    lang: initialLang,
  },

  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload;
      localStorage.setItem("i18nextLng", action.payload);
    },
  },
});

export const { setLanguage } = language.actions;
export default language.reducer;
