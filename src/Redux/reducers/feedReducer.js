import { createSlice } from "@reduxjs/toolkit";

const feedReducer = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => null,
  },
});

export const { addFeed, removeFeed } = feedReducer.actions;
export default feedReducer.reducer;
