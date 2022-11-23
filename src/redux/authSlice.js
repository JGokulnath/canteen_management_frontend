import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle", // idle, loading, failed,  ,succeeded
  email: "",
  isAdmin: false,
  verified: false,
};
export const fetchUserDetails = createAsyncThunk("getUserDetails", async () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const response = await axios.post(
    "verify-token",
    {},
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return { ...response.data };
});
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.email = action.payload.user;
      state.isAdmin = action.payload.isAdmin;
      state.verified = action.payload.verified;
    });
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchUserDetails.rejected, (state) => {
      state.status = "failed";
    });
  },
});
export const userVerified = (state) => state.auth.verified;
export const userAuthStatus = (state) => state.auth.status;
export const userAdmin = (state) => state.auth.isAdmin;
export const userEmail = (state) => state.auth.email;
export default authSlice.reducer;
