// src/store/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
// Import other reducers here
// import cartReducer from './slices/cartSlice';

// --- redux-persist imports ---
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// --- Combine Reducers ---
// Combine all your reducers here
const rootReducer = combineReducers({
  auth: authReducer,
  // cart: cartReducer,
  // products: productsReducer,
  // Add other reducers
});

// --- Persist Configuration ---
const persistConfig = {
  key: 'root', // Key for the persisted state in storage
  storage,      // Storage engine (localStorage by default)
  // Whitelist: Only persist specific slices (RECOMMENDED for auth token)
  whitelist: ['auth'],
  // Or Blacklist: Persist everything EXCEPT specific slices
  // blacklist: ['someTemporarySlice'],
};

// --- Create Persisted Reducer ---
const persistedReducer = persistReducer(persistConfig, rootReducer);

// --- Configure Store with Persisted Reducer ---
export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Required by redux-persist to avoid serialization errors for its actions
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== 'production',
});

// --- Create Persistor ---
export const persistor = persistStore(store);

// --- Types ---
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;