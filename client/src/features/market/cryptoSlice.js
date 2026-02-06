// src/market/cryptoSlice.js
import { createSlice } from '@reduxjs/toolkit';
import krakenPairs from '../kraken/pairs.json';

// FILTER USD QUOTE PAIRS
const usdPrefix = ['USD', 'USDT', 'USDC'];
const usdCoins = krakenPairs.filter(p => usdPrefix.includes(p.quote));

// HISTORY LIMIT
const historyQty = 50;

// INITIAL STATE
const initialState = {
  krakenCoins: usdCoins,
  krakenScannerList: ["ETH/USD", "BTC/USD", "SOL/USD", "LINK/USD", "LTC/USD", "XLM/USD",], // default pairs for scanner
  history: {},
  krakenGainers: [],
  reqSpeed: 2000,
  gainersQty: 10
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {

    // SAVE HISTORY SNAPSHOT
    setHistory: (state, action) => {
      const { reqCoin, resCoin } = action.payload;
      if (!state.history[reqCoin]) state.history[reqCoin] = [];

      state.history[reqCoin].push({
        coin: resCoin,
        updatedAt: Date.now()
      });

      // keep only the last X snapshots
      if (state.history[reqCoin].length > historyQty) {
        state.history[reqCoin].shift();
      }
    },

    // CALCULATE TOP GAINERS BASED ON CACHE
    calcGainers: (state, action) => {
      const { cache, gainersQty } = action.payload;

      // convert cache object to array of { pair, coin }
      const gainers = Object.keys(cache).map(pair => ({
        pair,
        coin: cache[pair]
      }));

      // sort descending by 24h % change
      gainers.sort(
        (a, b) => parseFloat(b.coin.p?.[1] ?? 0) - parseFloat(a.coin.p?.[1] ?? 0)
      );

      // keep top N
      state.krakenGainers = gainers.slice(0, gainersQty);
    },

    // SET CUSTOM SCANNER LIST
    setScannerList: (state, action) => {
      // replace the list with the new array
      state.krakenScannerList = action.payload;
    },

    // OPTIONAL: update request speed dynamically
    setReqSpeed: (state, action) => {
      state.reqSpeed = action.payload;
    },

    // OPTIONAL: update gainersQty dynamically
    setGainersQty: (state, action) => {
      state.gainersQty = action.payload;
    }
  }
});

// EXPORT ACTIONS
export const {
  setHistory,
  calcGainers,
  setScannerList,
  setReqSpeed,
  setGainersQty
} = cryptoSlice.actions;

// SELECTORS
export const getKrakenAll = state => state.crypto.krakenCoins;
export const getKrakenScannerList = state => state.crypto.krakenScannerList;
export const getHistory = state => state.crypto.history;
export const getGainers = state => state.crypto.krakenGainers;
export const getReqSpeed = state => state.crypto.reqSpeed;
export const getGainersQty = state => state.crypto.gainersQty;

export default cryptoSlice.reducer;
