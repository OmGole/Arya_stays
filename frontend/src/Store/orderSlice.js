import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api/api.js';

const initialState = {
  createdOrder:{},
  updatedOrder:{},
  deletedOrder:{},
  ordersByUserId:[],
  current:[],
  past:[],
  error:''
};

export const getPastOrders = createAsyncThunk(
  'order/fetchPastOrders',
  async (id, {rejectWithValue}) => {
    try {
      const response = await api.get(`/api/v1/order/past/${id}`);
      return response.data;  
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCurrentOrders = createAsyncThunk(
  'order/fetchCurrentOrders',
  async (id, {rejectWithValue}) => {
    try {
      const response = await api.get(`/api/v1/order/current/${id}`);
      return response.data;  
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editOrder = createAsyncThunk(
  'order/changeOrder',
  async (updatedOrder, {rejectWithValue}) => {
    try {
    const response = await api.patch(`/api/v1/order/${updatedOrder.id}`,updatedOrder.newOrder);
    return response.data;  
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
    
  }
);

export const createOrder = createAsyncThunk(
  'order/createNewOrder',
  async (newOrder, {rejectWithValue}) => {
    try {
      const response = await api.post(`/api/v1/order`, newOrder);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'order/removeOrder',
  async (id, {rejectWithValue}) => {
    try {
      const response = await api.delete(`/api/v1/order/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},

  extraReducers:  {
    [getPastOrders.fulfilled] : (state, { payload }) => {
      console.log("helo");
      console.log(payload);
      state.past = payload;
      state.error = '';
    },
    [getPastOrders.rejected] : (state, { payload }) => {
      console.log(payload);
      state.past = {};
      state.error = payload;
    },
    [getCurrentOrders.fulfilled] : (state, { payload }) => {
      console.log(payload);
      state.current = payload;
      state.error = '';
    },
    [getCurrentOrders.rejected] : (state, { payload }) => {
      console.log(payload);
      state.current = {};
      state.error = payload;
    },
    [createOrder.fulfilled] : (state, { payload }) => {
      console.log(payload);
      state.createOrder = payload;
      state.error = '';
    },
    [createOrder.rejected] : (state, { payload }) => {
      console.log(payload);
      state.createdOrder = {};
      state.error = payload;
    },
    [editOrder.fulfilled] : (state,{ payload }) => {
      console.log(payload);
      state.updatedOrder = payload;
      state.error = '';
    },
    [editOrder.rejected] : (state, { payload }) => {
      console.log(payload);
      state.updatedOrder = {};
      state.error = payload;
    },
    [deleteOrder.fulfilled] : (state,{ payload }) => {
      console.log(payload);
      state.deletedOrder = payload;
      state.error = '';
    },
    [deleteOrder.rejected] : (state, { payload }) => {
      console.log(payload);
      state.deletedOrder = {};
      state.error = payload;
    },
  },
});

export default orderSlice.reducer;
