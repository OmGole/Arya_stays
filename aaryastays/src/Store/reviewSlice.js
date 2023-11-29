import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api.js";

const initialState = {
  createReview: {},
  deletedReview:{},
  error: "",
};

// export const getReviewById = createAsyncThunk(
//   'review/fetchReviewById',
//   async (id, {rejectWithValue}) => {
//     try {
//       const response = await api.get(`/api/v1/review/${id}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const postReview = createAsyncThunk(
  "review/createNewReview",
  async (newReview, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/v1/review`, newReview);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/removeReview",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/v1/review/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},

  extraReducers: {
    [postReview.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.createReview = payload;
      state.error = "";
    },
    [postReview.rejected]: (state, { payload }) => {
      console.log(payload);
      state.createReview = {};
      state.error = payload;
    },
    [deleteReview.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.deletedReview = payload;
      state.error = "";
    },
    [deleteReview.rejected]: (state, { payload }) => {
      console.log(payload);
      state.deletedReview = {};
      state.error = payload;
    },
    //     [getCurrentOrders.fulfilled] : (state, { payload }) => {
    //       console.log(payload);
    //       state.current = payload;
    //       state.error = '';
    //     },
    //     [getCurrentOrders.rejected] : (state, { payload }) => {
    //       console.log(payload);
    //       state.current = {};
    //       state.error = payload;
    //     },
    //     [createOrder.fulfilled] : (state, { payload }) => {
    //       console.log(payload);
    //       state.createOrder = payload;
    //       state.error = '';
    //     },
    //     [createOrder.rejected] : (state, { payload }) => {
    //       console.log(payload);
    //       state.createdOrder = {};
    //       state.error = payload;
    //     },
    //     [editOrder.fulfilled] : (state,{ payload }) => {
    //       console.log(payload);
    //       state.updatedOrder = payload;
    //       state.error = '';
    //     },
    //     [editOrder.rejected] : (state, { payload }) => {
    //       console.log(payload);
    //       state.updatedOrder = {};
    //       state.error = payload;
    //     },
    //     [deleteOrder.fulfilled] : (state,{ payload }) => {
    //       console.log(payload);
    //       state.deletedOrder = payload;
    //       state.error = '';
    //     },
    //     [deleteOrder.rejected] : (state, { payload }) => {
    //       console.log(payload);
    //       state.deletedOrder = {};
    //       state.error = payload;
    //     },
  },
});

export default reviewSlice.reducer;