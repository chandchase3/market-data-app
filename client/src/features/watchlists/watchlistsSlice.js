import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  byId: {
    test_watchlist_1: {
      id: 'test_watchlist_1',
      name: 'Kraken Core Watchlist',
      exchange: 'kraken',
      symbols: ['BTC/USD', 'ETH/USD', 'SOL/USD'],
      createdAt: Date.now(),
    },
  },
  allIds: ['test_watchlist_1'],
  activeWatchlistId: 'test_watchlist_1',
};

const watchlistsSlice = createSlice({
  name: 'watchlists',
  initialState,
  reducers: {
    setActiveWatchlist(state, action) {
      state.activeWatchlistId = action.payload;
    },
  },
});

export const { setActiveWatchlist } = watchlistsSlice.actions;

// SELECTORS
export const getWatchlists = (state) => state.watchlists.allIds.map(
  (id) => state.watchlists.byId[id]
);

export const getActiveWatchlist = (state) =>
  state.watchlists.byId[state.watchlists.activeWatchlistId];

export default watchlistsSlice.reducer;
