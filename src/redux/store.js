import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    cartRuducer: cartSlice,
  },
  devTools: true,
});

export default store;
