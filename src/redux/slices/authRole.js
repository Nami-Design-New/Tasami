import { createSlice } from "@reduxjs/toolkit";

export const authRole = createSlice({
  name: "authRole",

  initialState: {
    role: "user",
    user: null,
  },

  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.role = action.payload?.role || null;
    },
    clearAuth: (state) => {
      state.role = null;
      state.user = null;
    },
  },
});

export const { setRole, setUser, clearAuth } = authRole.actions;
export default authRole.reducer;
