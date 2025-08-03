// packages
import { configureStore } from "@reduxjs/toolkit";

// reducers
import userReducer from "./reducers/userReducer";

/**
 * App store
 * @returns {Object} - The app store
 */
const appStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default appStore;
