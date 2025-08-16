import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequest: (state, action) => {
            const filteredUsers = state.filter((user) => user._id !== action.payload);
            return filteredUsers;
        },
    }
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
