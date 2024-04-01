import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    saveForm: {
      prepare(name, email, phone, currentStep) {
        return { payload: { name, email, phone, currentStep } };
      },

      reducer(state, action) {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
      },
    },
  },
});

export const { saveForm } = formSlice.actions;

export default formSlice.reducer;
