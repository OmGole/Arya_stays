import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Store/userSlice.js';

export const store = configureStore({
  reducer: {
    user:userReducer,
  },
})