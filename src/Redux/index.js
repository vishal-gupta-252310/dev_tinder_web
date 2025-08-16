// packages
import { configureStore } from "@reduxjs/toolkit";

// reducers
import userReducer from "./reducers/userReducer";
import feedReducer from "./reducers/feedReducer";
import connectionReducer from "./reducers/connectionReducer";
import requestReducer from "./reducers/requestReducer";

/**
 * App store
 * @returns {Object} - The app store
 */
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    request: requestReducer,
  },
});

export default appStore;
