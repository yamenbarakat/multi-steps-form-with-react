import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  price: "",
  planDuration: "",
};

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    savePlan: {
      prepare(type, price, planDuration) {
        return {
          payload: { type, price, planDuration },
        };
      },

      reducer(state, action) {
        state.type = action.payload.type;
        state.price = action.payload.price;
        state.planDuration = action.payload.planDuration;
      },
    },
  },
});

export const { savePlan } = planSlice.actions;

export default planSlice.reducer;
