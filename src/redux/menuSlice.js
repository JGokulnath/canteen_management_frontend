import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  menus: [],
  status: "idle", // 'idle' | 'loading'  | 'succeeded | 'failed'
};

export const fetchMenu = createAsyncThunk("getMenus", async () => {
  const response = await axios.get("menu", { withCredentials: true });
  return [...response.data];
});

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addMenu: (state, action) => {
      let newMenu = [...state.menus];
      newMenu.push(action.payload);
      state.menus = newMenu;
    },
    editMenu: (state, action) => {
      let newMenu = [...state.menus];
      let newIdx = [...state.menus].findIndex(
        (i) => i._id === action.payload._id
      );
      newMenu[newIdx] = action.payload;
      state.menus = newMenu;
    },
    deleteMenu: (state, action) => {
      let newMenu = [...state.menus].filter(
        (item) => !item._id === action.payload
      );
      state.menus = newMenu;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMenu.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.menus = [...action.payload];
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
export const { addMenu, editMenu, deleteMenu } = menuSlice.actions;
export const selectMenus = (state) => state.menu.menus;
export const selectStatus = (state) => state.menu.status;
export default menuSlice.reducer;
