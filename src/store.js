import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/formSlice";
import planReducer from "./features/planSlice";
import pageReducer from "./features/pageSlice";
import addOnsReducer from "./features/addOnsSlice";

const store = configureStore({
  reducer: {
    page: pageReducer,
    form: formReducer,
    plan: planReducer,
    offers: addOnsReducer,
  },
});

export default store;
