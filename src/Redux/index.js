// packages
import { configureStore } from "@reduxjs/toolkit";

// reducers
import userReducer from "./reducers/userReducer";
import feedReducer from "./reducers/feedReducer";

/**
 * App store
 * @returns {Object} - The app store
 */
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});

export default appStore;
