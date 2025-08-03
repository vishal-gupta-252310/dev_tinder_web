// packages
import { createSlice } from "@reduxjs/toolkit";

/**
 * User reducer
 * @returns {Object} - The user reducer
 */
const userReducer = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    /**
     * Adds a user to the state
     * @param {Object} state - The current state
     * @param {Object} action - The action object containing the user data
     */
    addUser: (state, action) => {
      state.user = action.payload;
    },
    /**
     * Removes the user from the state
     * @param {object} state 
     */
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { addUser, removeUser } = userReducer.actions;
export default userReducer.reducer;
