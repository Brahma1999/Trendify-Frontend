import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchLoggedInUserOrders,
  fetchLoggedInUser,
  updateUser,
} from "./userApi";

const initialState = {
  userOrders: null, // this should only contain user identity => 'id'/'role'
  status: "idle",
  userInfo: null,
};

//LoggedInUser
export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async (id) => {
    const response = await fetchLoggedInUser(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

//LoggedInUserOrder
// export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
//   "user/fetchLoggedInUserOrders",
//   async (id) => {
//     const response = await fetchLoggedInUserOrders(id);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    return response.data;
  }
);

//Update user Async
export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      });
  },
});

export const selectUserInfoStatus = (state) => state.user.status;
export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
