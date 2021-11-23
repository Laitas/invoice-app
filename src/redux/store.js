import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import filterSlice from './filterSlice';
import userSlice from './userSlice';
import formSlice from './formSlice';

const rootReducer = combineReducers({
        user: userSlice,
        filter: filterSlice,
        form : formSlice
})

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
})