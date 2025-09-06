import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnections: (state, action) => action.payload,
    removeConnections: () => null,
    removeConnection: (state, action) => {
      return state.filter((user) => user?._id !== action.payload);
    },
  },
});

export const { addConnections, removeConnections, removeConnection } =
  connectionSlice.actions;
export default connectionSlice.reducer;
