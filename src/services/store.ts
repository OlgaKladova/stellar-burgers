import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { authSlice } from './auth/slice';
import { ordersSlice } from './orders/slice';
import { feedSlice } from './feed/slice';
import { ingredientsSlice } from './ingredients/slice';
import { constructorSlice } from './constructor/slice';
import { orderSlice } from './order/slice';

export const rootReducer = combineSlices(
  authSlice,
  ordersSlice,
  feedSlice,
  ingredientsSlice,
  constructorSlice,
  orderSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
