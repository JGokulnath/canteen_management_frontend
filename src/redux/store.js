import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import productReducer from "./productSlice";
import authReducer from "./authSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    menu: menuReducer,
  },
});
