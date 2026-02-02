import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import watchlistsReducer from '../features/watchlists/watchlistsSlice'; // <-- NO braces

export const store = configureStore({
  reducer: {
    user: userReducer,
    watchlists: watchlistsReducer,
  },
});
