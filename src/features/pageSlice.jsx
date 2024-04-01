import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageNumber: 1,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
});

export const { setPageNumber } = pageSlice.actions;
export default pageSlice.reducer;
