import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Store/userSlice.js';
import orderReducer from '../Store/orderSlice.js';

export const store = configureStore({
  reducer: {
    user:userReducer,
    order:orderReducer
  },
})