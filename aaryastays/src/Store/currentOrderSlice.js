import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentOrder: {
    amenities: [],
  },
};

export const currentOrderSlice = createSlice({
  name: "currentOrder",
  initialState,
  reducers: {
    updateOrder: (state, action) => {
      const { key, value } = action.payload;

      // Add the value to the 'order' object using the dynamic key
      state.currentOrder[key] = value;
    },
  },
});

export const { updateOrder } = currentOrderSlice.actions;

export default currentOrderSlice.reducer;
