import { createSlice } from "@reduxjs/toolkit";

export const adminAuth = createSlice({
  name: "adminAuth",
  initialState: {
    user: null,
    role: null,
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
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setUser, setAuthed, clearAuth, setRole } = adminAuth.actions;
export default adminAuth.reducer;
