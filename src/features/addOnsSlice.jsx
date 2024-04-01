import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offers: [],
};

const addOnsSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    setOffer(state, action) {
      state.offers = action.payload;
    },
  },
});

export const { setOffer } = addOnsSlice.actions;

export default addOnsSlice.reducer;
