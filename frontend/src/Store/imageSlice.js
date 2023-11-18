import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api/api.js';

const initialState = {
  allImages:[],
  imageById:{},
  createdImage:{},
  deletedImage:{},
  updatedImage:{},
  error:''
};

export const getAllImages = createAsyncThunk(
  'image/fetchAllImages',
  async (id, {rejectWithValue}) => {
    try {
      const response = await api.get(`/api/v1/image`);
      return response.data;  
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const getImageById = createAsyncThunk(
  'image/fetchImageById',
  async (id, {rejectWithValue}) => {
    try {
      const response = await api.get(`/api/v1/image/${id}`);
      return response.data;  
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createImage = createAsyncThunk(
  'image/createNewImage',
  async (newImage, {rejectWithValue}) => {
    try {
      const response = await api.post(`/api/v1/image`, newImage);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editImage = createAsyncThunk(
  'image/changeImage',
  async (updatedImage, {rejectWithValue}) => {
    try {
    const response = await api.patch(`/api/v1/image/${updatedImage.id}`,updatedImage.newImage);
    return response.data;  
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
    
  }
);

export const deleteImage = createAsyncThunk(
  'image/removeImage',
  async (id, {rejectWithValue}) => {
    try {
      const response = await api.delete(`/api/v1/image/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {},

  extraReducers:  {
    [getAllImages.fulfilled] : (state, { payload }) => {
      console.log(payload);
      state.allImages = payload;
      state.error = '';
    },
    [getAllImages.rejected] : (state, { payload }) => {
      console.log(payload);
      state.allImages = {};
      state.error = payload;
    },
    [getImageById.fulfilled] : (state, { payload }) => {
      console.log(payload);
      state.imageById = payload;
      state.error = '';
    },
    [getImageById.rejected] : (state, { payload }) => {
      console.log(payload);
      state.imageById = {};
      state.error = payload;
    },
    [createImage.fulfilled] : (state, { payload }) => {
      console.log(payload);
      state.createdImage = payload;
      state.error = '';
    },
    [createImage.rejected] : (state, { payload }) => {
      console.log(payload);
      state.createdImage = {};
      state.error = payload;
    },
    [editImage.fulfilled] : (state,{ payload }) => {
      console.log(payload);
      state.updatedImage = payload;
      state.error = '';
    },
    [editImage.rejected] : (state, { payload }) => {
      console.log(payload);
      state.updatedImage = {};
      state.error = payload;
    },
    [deleteImage.fulfilled] : (state,{ payload }) => {
      console.log(payload);
      state.deletedImage = payload;
      state.error = '';
    },
    [deleteImage.rejected] : (state, { payload }) => {
      console.log(payload);
      state.deletedImage = {};
      state.error = payload;
    },
  },
});

export default imageSlice.reducer;
