import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Store/userSlice.js';
import orderReducer from '../Store/orderSlice.js';
import amenityReducer from './amenitySlice.js';
import cardReducer from "./cardSlice.js";

export const store = configureStore({
  reducer: {
    user:userReducer,
    order:orderReducer,
    amenity:amenityReducer,
    card:cardReducer
  },
})