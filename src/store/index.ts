import {
  ThunkDispatch,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import authReducer from "modules/auth/auth.slice";
import { useDispatch } from "react-redux";
import { createLogger } from "redux-logger";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";
import categoriesReducer from "modules/categories/categories.slice";
import { rtkQueryErrorLogger } from "./errorhandler";

const logger = createLogger({
  predicate: () => process.env.NODE_ENV === "development",
  logErrors: true,
});
const reducers = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
});

const persistConfig = {
  key: "root",
  blacklist: [],
  storage: storage,
  whitelist: ["auth"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger, thunk, rtkQueryErrorLogger],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export const useAppDispatch = () =>
  useDispatch<typeof store.dispatch & ThunkDispatch<any, any, any>>();
