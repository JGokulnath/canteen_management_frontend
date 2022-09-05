import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  cart: [],
  status: "idle", // 'idle' | 'loading'  | 'succeeded | 'failed'
  error: false,
};

export const fetchProducts = createAsyncThunk("getProducts", async () => {
  const response = await axios.get("products");
  return [...response.data.products];
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let newCart = [...state.cart];
      let newData = state.products.find(
        (product) => product._id === action.payload
      );
      newCart.push({ product: newData, quantity: 1 });
      state.cart = [...newCart];
    },
    increaseQuantity: (state, action) => {
      let newCart = [...state.cart];
      let newDataIndex = newCart.findIndex(
        (item) => item.product._id === action.payload
      );
      let newData = newCart[newDataIndex];
      newData = { ...newData, quantity: newData.quantity + 1 };
      newCart[newDataIndex] = newData;
      state.cart = [...newCart];
    },
    decreaseQuantity: (state, action) => {
      let newCart = [...state.cart];
      let newDataIndex = newCart.findIndex(
        (item) => item.product._id === action.payload
      );
      let newData = newCart[newDataIndex];
      newData = { ...newData, quantity: newData.quantity - 1 };
      newCart[newDataIndex] = newData;
      state.cart = [...newCart];
    },
    removeFromCart: (state, action) => {
      let newData = [...state.cart].filter(
        (item) => item._id !== action.payload
      );
      state.cart = [...newData];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = [...action.payload];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = true;
      });
  },
});
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  productSlice.actions;
export const selectProducts = (state) => state.product.products;
export const selectStatus = (state) => state.product.status;
export const selectCart = (state) => state.product.cart;
export default productSlice.reducer;
