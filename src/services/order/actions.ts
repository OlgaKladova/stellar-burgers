import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi } from '../../utils/burger-api';

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (ingredients: string[]) => orderBurgerApi(ingredients)
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    const respons = await getOrderByNumberApi(number);
    return respons.orders[0];
  }
);
