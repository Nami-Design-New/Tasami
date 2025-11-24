import { createSlice } from "@reduxjs/toolkit";

export const authRole = createSlice({
  name: "authRole",

  initialState: {
    user: null,
    isAuthed: false,
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthed = true;
    },
    setAuthed: (state, action) => {
      state.isAuthed = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthed = false;
    },
  },
});

export const { setUser, setAuthed, clearAuth } = authRole.actions;
export default authRole.reducer;
