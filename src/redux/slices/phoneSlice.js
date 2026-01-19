import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullPhone: null,
  phone: null,
  phoneCode: null,
  email: null,
};

const phoneSlice = createSlice({
  name: "phone",
  initialState,
  reducers: {
    setPhoneData: (state, action) => {
      state.fullPhone = action.payload.fullPhone;
      state.phone = action.payload.phone;
      state.phoneCode = action.payload.phoneCode;
    },
    setEmail: (state, action) => {
      state.email = action.payload.email;
    },
    clearPhoneData: (state) => {
      state.fullPhone = null;
      state.phone = null;
      state.phoneCode = null;
    },
    clearEmail: (state) => {
      state.email = null;
    },
  },
});

export const { setPhoneData, clearPhoneData, setEmail, clearEmail } =
  phoneSlice.actions;
export default phoneSlice.reducer;
