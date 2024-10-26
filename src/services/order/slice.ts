import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurger, getOrderByNumber } from './actions';

type TOrderSlice = {
  newOrder: TOrder | null;
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderSlice = {
  newOrder: null,
  order: null,
  isLoading: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: () => initialState
  },
  selectors: {
    getNewOrder: (state) => state.newOrder,
    getOrder: (state) => state.order,
    getIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        (state.isLoading = true), (state.error = null);
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        (state.newOrder = action.payload.order),
          (state.isLoading = false),
          (state.error = null);
      })
      .addCase(orderBurger.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.error.message ?? null);
      })
      .addCase(getOrderByNumber.pending, (state) => {
        (state.isLoading = true), (state.error = null);
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.error = null),
          (state.order = action.payload);
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.error.message ?? null);
      });
  }
});

export const { getNewOrder, getOrder, getIsLoading } = orderSlice.selectors;
export const { clearOrder } = orderSlice.actions;
