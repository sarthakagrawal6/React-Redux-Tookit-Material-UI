import { configureStore } from "@reduxjs/toolkit";
import authReducer from "modules/auth/auth.slice";
// import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// export const persistor = persistStore(store);
