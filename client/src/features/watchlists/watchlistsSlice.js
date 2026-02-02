import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosInstance';

export const fetchWatchlists = createAsyncThunk(
  'watchlists/fetchAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState()
      const token = state.user.token // get token from Redux
      const response = await api.get('/watchlists', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Network error' })
    }
  }
)

export const addWatchlist = createAsyncThunk(
  'watchlists/add',
  async (name, { rejectWithValue, getState }) => {
    try {
      const state = getState()
      const token = state.user.token
      const response = await api.post(
        '/watchlists',
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Network error' })
    }
  }
)


const watchlistsSlice = createSlice({
  name: 'watchlists',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchWatchlists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWatchlists.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWatchlists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch watchlists';
      })

      // Add
      .addCase(addWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add watchlist';
      });
  },
});

export default watchlistsSlice.reducer;
