import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  cart: [],
  status: "idle", // 'idle' | 'loading'  | 'succeeded | 'failed'
  error: false,
};

export const fetchProducts = createAsyncThunk("getProducts", async () => {
  const response = await axios.get("products", { withCredentials: true });
  return [...response.data.products];
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      let newProducts = [...state.products];
      newProducts.push(action.payload);
      state.products = newProducts;
    },
    editProduct: (state, action) => {
      let newProduct = action.payload;
      let newProducts = [...state.products];
      let idx = newProducts.findIndex((item) => item._id === newProduct._id);
      newProducts[idx] = { ...newProduct };
      state.products = [...newProducts];
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
export const { addProduct, editProduct } = productSlice.actions;
export const selectProducts = (state) => state.product.products;
export const selectStatus = (state) => state.product.status;
export const selectCart = (state) => state.product.cart;
export default productSlice.reducer;
