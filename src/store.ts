import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { todoSlice } from "./features/todos/TodoSlice";
import { authSlice } from "./features/auth/AuthSlice";

// Combine the reducers into a rootReducer
const rootReducer = combineReducers({
  todo: todoSlice.reducer,
  auth: authSlice.reducer,
});

// Define RootState based on the rootReducer to prevent 'any' type error
export type RootState = ReturnType<typeof rootReducer>;

// Configuration for redux-persist with the RootState type
const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["todo", "auth"], // Specify which slices of state to persist
};

// Apply persistReducer to the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor to rehydrate the store
export const persistor = persistStore(store);

// Custom hooks for using Redux in the app
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
