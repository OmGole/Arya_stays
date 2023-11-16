// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import api from '../api/api.js';

// const initialState = {
//   createdReview:{},
//   error:''
// };


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

// export const createReview = createAsyncThunk(
//   'review/createNewReview',
//   async (newReview, {rejectWithValue}) => {
//     try {
//       const response = await api.post(`/api/v1/review`, newReview);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );



// export const reviewSlice = createSlice({
//   name: 'review',
//   initialState,
//   reducers: {},

//   extraReducers:  {
//     [getReviewById.fulfilled] : (state, { payload }) => {
//       console.log(payload);
//       state.past = payload;
//       state.error = '';
//     },
//     [getReviewById.rejected] : (state, { payload }) => {
//       console.log(payload);
//       state.past = {};
//       state.error = payload;
//     },
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
//   },
// });

// export default reviewSlice.reducer;
