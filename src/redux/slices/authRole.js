import { createSlice } from "@reduxjs/toolkit";

export const authRole = createSlice({
  name: "authRole",

  initialState: {
    role: { en: "user", ar: "مستخدم" },
  },

  reducers: {
    setRole: (state, action) => {
      // Handle both string and object payloads for backward compatibility
      if (typeof action.payload === 'string') {
        // If string is passed, try to find matching role
        state.role = action.payload;
      } else if (action.payload && typeof action.payload === 'object') {
        // If object with en/ar properties is passed
        state.role = action.payload;
      }
    },
  },
});

export const { setRole } = authRole.actions;
export default authRole.reducer;
