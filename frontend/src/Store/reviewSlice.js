import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api/api.js';

const initialState = {
  allReviews:{},
  reviewById:{},
  createdReview:{},
  error:''
};

export const getAllReviews = createAsyncThunk(
  'review/fetchAllReviews',
  async (id, {rejectWithValue}) => {
    try {
      const response = await api.get(`/api/v1/review`);
      return response.data;  
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const getReviewById = createAsyncThunk(
  'review/fetchReviewById',
  async (id, {rejectWithValue}) => {
    try {
      const response = await api.get(`/api/v1/review/${id}`);
      return response.data;  
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createReview = createAsyncThunk(
  'review/createNewReview',
  async (newReview, {rejectWithValue}) => {
    try {
      const response = await api.post(`/api/v1/review`, newReview);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},

  extraReducers:  {
    [getReviewById.fulfilled] : (state, { payload }) => {
      console.log(payload);
      state.reviewById = payload;
      state.error = '';
    },
    [getReviewById.rejected] : (state, { payload }) => {
      console.log(payload);
      state.reviewById = {};
      state.error = payload;
    },
    [getAllReviews.fulfilled] : (state, { payload }) => {
      console.log(payload);
      state.allReviews = payload;
      state.error = '';
    },
    [getAllReviews.rejected] : (state, { payload }) => {
      console.log(payload);
      state.allReviews = {};
      state.error = payload;
    },
    [createReview.fulfilled] : (state, { payload }) => {
      console.log(payload);
      state.createdReview = payload;
      state.error = '';
    },
    [createReview.rejected] : (state, { payload }) => {
      console.log(payload);
      state.createdReview = {};
      state.error = payload;
    }
  },
});

export default reviewSlice.reducer;
