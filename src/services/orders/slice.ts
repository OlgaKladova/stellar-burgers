import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getOrders } from './actions';

type TOrdersSlice = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

export const initialState: TOrdersSlice = {
  orders: [],
  isLoading: false,
  error: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrdersSelector: (state) => state.orders,
    getIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  }
});

export const { getOrdersSelector, getIsLoading } = ordersSlice.selectors;
