import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getIngredientsApi,
  getOrderByNumberApi
} from '../../utils/burger-api';

export const getFeeds = createAsyncThunk('feed/getFeeds', async () =>
  getFeedsApi()
);

export const getIngredients = createAsyncThunk(
  'feed/getIngredients',
  async () => await getIngredientsApi()
);

export const getOrderByNumber = createAsyncThunk(
  'feed/getOrderByNumber',
  async (number: number) => {
    const respons = await getOrderByNumberApi(number);
    return respons.orders[0];
  }
);
