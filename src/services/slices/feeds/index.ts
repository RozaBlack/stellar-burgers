import { getFeedsApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

type TFeedsState = {
  isLoading: boolean;
  error: null | SerializedError;
  feeds: TOrdersData;
};

const initialState: TFeedsState = {
  isLoading: true,
  error: null,
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const fetchFeeds = createAsyncThunk(
  'feeds/fetch',
  async () => await getFeedsApi()
);

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedsOrdersSelector: (state) => state.feeds?.orders,
    getFeedsSelector: (state) => state.feeds,
    getFeedsIsLoadingSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeds = action.payload;
        state.error = null;
      });
  }
});

export const {
  getFeedsSelector,
  getFeedsIsLoadingSelector,
  getFeedsOrdersSelector
} = feedsSlice.selectors;
export const ingredientReducer = feedsSlice.reducer;
