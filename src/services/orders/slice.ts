import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getOrders } from './actions';

type TOrdersSlice = {
  orders: TOrder[];
  isLoading: boolean;
};

export const initialState: TOrdersSlice = {
  orders: [],
  isLoading: false
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
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { getOrdersSelector, getIsLoading } = ordersSlice.selectors;
