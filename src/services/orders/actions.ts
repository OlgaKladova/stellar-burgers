import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';

export const getOrders = createAsyncThunk('orders/getOrders', async () =>
  getOrdersApi()
);
