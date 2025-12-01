import { createSlice } from "@reduxjs/toolkit";

const initial = localStorage.getItem("chatId");

const chat = createSlice({
  name: "activeChat",

  initialState: {
    chat: initial,
  },

  reducers: {
    setChat: (state, action) => {
      state.chat = action.payload;
    },
  },
});

export const { setChat } = chat.actions;
export default chat.reducer;
