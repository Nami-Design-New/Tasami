import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullPhone: null,
  phone: null,
  phoneCode: null,
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
    clearPhoneData: (state) => {
      state.fullPhone = null;
      state.phone = null;
      state.phoneCode = null;
    },
  },
});

export const { setPhoneData, clearPhoneData } = phoneSlice.actions;
export default phoneSlice.reducer;
