// import { createSlice } from "@reduxjs/toolkit";

// export const authRole = createSlice({
//   name: "authRole",

//   initialState: {
//     user: null,
//     isAuthed: false,
//     previousLevel: null,
//     showLevelUpModal: false,
//     levelUpData: null,
//   },

//   reducers: {
//     setUser: (state, action) => {
//       const newUser = action.payload;
//       const currentLevel = newUser?.experience_level;
//       const previousLevel = state.previousLevel;

//       // Check for level up (only if we have a previous level to compare)
//       if (
//         previousLevel !== null &&
//         currentLevel !== undefined &&
//         currentLevel > previousLevel
//       ) {
//         state.showLevelUpModal = true;
//         state.levelUpData = {
//           oldLevel: previousLevel,
//           newLevel: currentLevel,
//           user: newUser,
//         };
//       }

//       // Update user data and track current level for next comparison
//       state.user = newUser;
//       state.isAuthed = true;

//       // Store current level as previous level for next check
//       if (currentLevel !== undefined) {
//         state.previousLevel = currentLevel;
//       }
//     },

//     setAuthed: (state, action) => {
//       state.isAuthed = action.payload;
//     },

//     dismissLevelUp: (state) => {
//       state.showLevelUpModal = false;
//       state.levelUpData = null;
//     },

//     clearAuth: (state) => {
//       state.user = null;
//       state.isAuthed = false;
//       state.previousLevel = null;
//       state.showLevelUpModal = false;
//       state.levelUpData = null;
//     },
//   },
// });

// export const { setUser, setAuthed, dismissLevelUp, clearAuth } =
//   authRole.actions;
// export default authRole.reducer;
// ============================================
// 1. UPDATED AUTH SLICE: authRole.js
// ============================================

import { createSlice } from "@reduxjs/toolkit";

// Helper to get initial previous level from localStorage
const getInitialPreviousLevel = () => {
  try {
    const stored = localStorage.getItem("userPreviousLevel");
    return stored ? parseInt(stored, 10) : null;
  } catch {
    return null;
  }
};

export const authRole = createSlice({
  name: "authRole",

  initialState: {
    user: null,
    isAuthed: false,
    previousLevel: getInitialPreviousLevel(), // Load from localStorage
    showLevelUpModal: false,
    levelUpData: null,
  },

  reducers: {
    setUser: (state, action) => {
      const newUser = action.payload;
      const currentLevel = newUser?.experience_level;
      const previousLevel = state.previousLevel;

      // Check for level up (only if we have a previous level to compare)
      if (
        previousLevel !== null &&
        currentLevel !== undefined &&
        currentLevel > previousLevel
      ) {
        state.showLevelUpModal = true;
        state.levelUpData = {
          oldLevel: previousLevel,
          newLevel: currentLevel,
          user: newUser,
        };
      }

      // Update user data and track current level for next comparison
      state.user = newUser;
      state.isAuthed = true;

      // Store current level as previous level for next check
      if (currentLevel !== undefined) {
        state.previousLevel = currentLevel;
        // Persist to localStorage so it survives page refresh
        try {
          localStorage.setItem("userPreviousLevel", currentLevel.toString());
        } catch (error) {
          console.error("Failed to save level to localStorage:", error);
        }
      }
    },

    setAuthed: (state, action) => {
      state.isAuthed = action.payload;
    },

    dismissLevelUp: (state) => {
      state.showLevelUpModal = false;
      state.levelUpData = null;
    },

    clearAuth: (state) => {
      state.user = null;
      state.isAuthed = false;
      state.previousLevel = null;
      state.showLevelUpModal = false;
      state.levelUpData = null;

      // Clear localStorage when user logs out
      try {
        localStorage.removeItem("userPreviousLevel");
      } catch (error) {
        console.error("Failed to clear level from localStorage:", error);
      }
    },
  },
});

export const { setUser, setAuthed, dismissLevelUp, clearAuth } =
  authRole.actions;
export default authRole.reducer;
