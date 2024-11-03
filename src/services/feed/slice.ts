import { createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrder, TOrdersData } from '../../utils/types';
import { getFeeds, getIngredients, getOrderByNumber } from './actions';
type TFeedSlice = {
  orders: TOrder[];
  order: TOrder | null;
  ingredients: TIngredient[];
  feed: TOrdersData;
  isLoading: boolean;
  error: string | null;
};
export const initialState: TFeedSlice = {
  orders: [],
  order: null,
  ingredients: [],
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedSelector: (state) => state.orders,
    getIsLoading: (state) => state.isLoading,
    getIngredientsSelector: (state) => state.ingredients,
    getOrder: (state) => state.order,
    getFeed: (state) => state.feed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.feed = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.order = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  }
});
export const {
  getFeedSelector,
  getIsLoading,
  getIngredientsSelector,
  getOrder,
  getFeed
} = feedSlice.selectors;
