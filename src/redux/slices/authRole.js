import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/token";

const token = getToken();
console.log(token);

export const authRole = createSlice({
  name: "authRole",

  initialState: {
    role: "user",
    user: null,
    isAuthed: token ? true : false,
  },

  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.role = action.payload?.role || null;
      state.isAuthed = token ? true : false;
    },
    clearAuth: (state) => {
      state.role = null;
      state.user = null;
      state.isAuthed = false;
    },
  },
});

export const { setRole, setUser, clearAuth } = authRole.actions;
export default authRole.reducer;
