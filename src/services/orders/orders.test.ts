import { configureStore } from '@reduxjs/toolkit';
import { ordersSlice } from './slice';
import { getOrders } from './actions';

describe('Проверка редьюсера слайса orders', () => {
  test('состояние загрузки', async () => {
    global.fetch = jest.fn() as jest.Mock;
    const store = configureStore({
      reducer: { orders: ordersSlice.reducer }
    });
    await store.dispatch(getOrders.pending(''));
    const { isLoading } = store.getState().orders;
    expect(isLoading).toBe(true);
  });

  test('состояние получения успешного ответа', async () => {
    const expectedResult = [
      {
        _id: '1',
        status: 'done',
        name: 'test',
        createdAt: 'hfgt',
        updatedAt: 'gcffgx',
        number: 7656,
        ingredients: ['6564', '43432356', '44334']
      },
      {
        _id: '2',
        status: 'done',
        name: 'test',
        createdAt: 'rrrrrr',
        updatedAt: 'gggggg',
        number: 7656,
        ingredients: ['65645694', '43432356', '44334987']
      }
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(expectedResult)
      })
    ) as jest.Mock;

    const store = configureStore({
      reducer: { orders: ordersSlice.reducer }
    });

    await store.dispatch(getOrders.fulfilled(expectedResult, ''));
    const { orders, isLoading } = store.getState().orders;
    expect(orders).toEqual(expectedResult);
    expect(isLoading).toBe(false);
  });

  test('состояние ошибки', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject({
        json: () => Promise.reject(Error('error'))
      })
    ) as jest.Mock;
    const store = configureStore({
      reducer: { orders: ordersSlice.reducer }
    });
    await store.dispatch(getOrders.rejected(Error('error'), ''));
    const { isLoading, error } = store.getState().orders;
    expect(error).toBe('error');
    expect(isLoading).toBe(false);
  });
});
