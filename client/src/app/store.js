import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import watchlistsReducer from '../features/watchlists/watchlistsSlice';
import cryptoReducer from '../features/market/cryptoSlice';
import uiReducer from '../features/ui/uiSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    watchlists: watchlistsReducer,
    crypto: cryptoReducer,
    ui: uiReducer
  }
});
