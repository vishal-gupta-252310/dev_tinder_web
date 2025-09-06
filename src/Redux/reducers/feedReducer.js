import { createSlice } from "@reduxjs/toolkit";

const feedReducer = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeAllFeed: () => null,
    removeSingleFeed: (state, action) => {
      return state.filter((user) => user?._id !== action?.payload);
    },
  },
});

export const { addFeed, removeFeed, removeSingleFeed } = feedReducer.actions;
export default feedReducer.reducer;
