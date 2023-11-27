import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api/api.js';

const initialState = {
  allEvents: [],
  eventById: {},
  createdEvent: {},
  deletedEvent: {},
  updatedEvent: {},
  error: "",
};


export const getAllEvents = createAsyncThunk(
  "event/fetchAllEvents",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/v1/event`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const getEventById = createAsyncThunk(
  "event/fetchEventById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/v1/event/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createEvent = createAsyncThunk(
  "event/createNewEvent",
  async (newEvent, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/v1/event`, newEvent);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editEvent = createAsyncThunk(
  "event/changeEvent",
  async (updatedEvent, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/api/v1/event/${updatedEvent.id}`,
        updatedEvent.newEvent
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "event/removeEvent",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/v1/event/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},

  extraReducers: {
    [getAllEvents.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.allEvents = payload;
      state.error = "";
    },
    [getAllEvents.rejected]: (state, { payload }) => {
      console.log(payload);
      state.allEvents = {};
      state.error = payload;
    },
    [getEventById.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.eventById = payload;
      state.error = "";
    },
    [getEventById.rejected]: (state, { payload }) => {
      console.log(payload);
      state.eventById = {};
      state.error = payload;
    },
    [createEvent.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.createdEvent = payload;
      state.error = "";
    },
    [createEvent.rejected]: (state, { payload }) => {
      console.log(payload);
      state.createdEvent = {};
      state.error = payload;
    },
    [editEvent.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.updatedEvent = payload;
      state.error = "";
    },
    [editEvent.rejected]: (state, { payload }) => {
      console.log(payload);
      state.updatedEvent = {};
      state.error = payload;
    },
    [deleteEvent.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.deletedEvent = payload;
      state.error = "";
    },
    [deleteEvent.rejected]: (state, { payload }) => {
      console.log(payload);
      state.deletedEvent = {};
      state.error = payload;
    },
  },
});


export default eventSlice.reducer;
