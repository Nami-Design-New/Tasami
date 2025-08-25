import { createSlice } from "@reduxjs/toolkit";

export const authRole = createSlice({
  name: "authRole",

  initialState: {
    role: null,
    user: null,
    isAuthed: false,
  },

  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.role = action.payload?.role || null;
      state.isAuthed = true;
    },
    setAuthed: (state, action) => {
      state.isAuthed = action.payload;
    },
    clearAuth: (state) => {
      state.role = null;
      state.user = null;
      state.isAuthed = false;
    },
  },
});

export const { setRole, setUser, setAuthed, clearAuth } = authRole.actions;
export default authRole.reducer;
