import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userSlice from './userSlice'

const rootReducer = combineReducers({
        user: userSlice,
})

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
})