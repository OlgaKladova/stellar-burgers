import { configureStore } from '@reduxjs/toolkit';
import { getOrderByNumber, orderBurger } from './actions';
import { clearOrder, orderSlice } from './slice';

describe('Проверка редьюсера слайса order', () => {
  test(' обработка экшена clearOrder', () => {
    const initialState = {
      newOrder: {
        _id: '1',
        status: 'done',
        name: 'test',
        createdAt: 'hfgt',
        updatedAt: 'gcffgx',
        number: 7656,
        ingredients: ['6564', '43432356', '44334']
      },
      order: {
        _id: '1',
        status: 'done',
        name: 'test',
        createdAt: 'hfgt',
        updatedAt: 'gcffgx',
        number: 7656,
        ingredients: ['6564', '43432356', '44334']
      },
      isLoading: false,
      error: null
    };
    const newState = orderSlice.reducer(initialState, clearOrder());
    expect(newState).toEqual({
      newOrder: null,
      order: null,
      isLoading: false,
      error: null
    });
  });

  describe('обработка экшена orderBurger', () => {
    test('состояние загрузки', async () => {
      global.fetch = jest.fn() as jest.Mock;
      const store = configureStore({
        reducer: { order: orderSlice.reducer }
      });
      await store.dispatch(orderBurger.pending('', []));
      const { isLoading } = store.getState().order;
      expect(isLoading).toBe(true);
    });

    test('состояние получения успешного ответа', async () => {
      const expectedResult = {
        name: 'test',
        success: true,
        order: {
          _id: '1',
          status: 'done',
          name: 'test',
          createdAt: 'hfgt',
          updatedAt: 'gcffgx',
          number: 7656,
          ingredients: ['6564', '43432356', '44334']
        }
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(expectedResult)
        })
      ) as jest.Mock;

      const store = configureStore({
        reducer: { order: orderSlice.reducer }
      });

      await store.dispatch(orderBurger.fulfilled(expectedResult, '', []));
      const { newOrder, isLoading } = store.getState().order;
      expect(newOrder).toEqual(expectedResult.order);
      expect(isLoading).toBe(false);
    });

    test('состояние ошибки', async () => {
      global.fetch = jest.fn(() =>
        Promise.reject({
          json: () => Promise.reject(Error('error'))
        })
      ) as jest.Mock;
      const store = configureStore({
        reducer: { order: orderSlice.reducer }
      });
      await store.dispatch(orderBurger.rejected(Error('error'), '', []));
      const { isLoading, error } = store.getState().order;
      expect(error).toBe('error');
      expect(isLoading).toBe(false);
    });
  });

  describe('обработка экшена getOrderByNumber', () => {
    test('состояние загрузки', async () => {
      global.fetch = jest.fn() as jest.Mock;
      const store = configureStore({
        reducer: { order: orderSlice.reducer }
      });
      await store.dispatch(getOrderByNumber.pending('', 2));
      const { isLoading } = store.getState().order;
      expect(isLoading).toBe(true);
    });

    test('состояние получения успешного ответа', async () => {
      const expectedResult = {
        _id: '1',
        status: 'done',
        name: 'test',
        createdAt: 'hfgt',
        updatedAt: 'gcffgx',
        number: 7656,
        ingredients: ['6564', '43432356', '44334']
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(expectedResult)
        })
      ) as jest.Mock;

      const store = configureStore({
        reducer: { order: orderSlice.reducer }
      });

      await store.dispatch(getOrderByNumber.fulfilled(expectedResult, '', 2));
      const { order, isLoading } = store.getState().order;
      expect(order).toEqual(expectedResult);
      expect(isLoading).toBe(false);
    });

    test('состояние ошибки', async () => {
      global.fetch = jest.fn(() =>
        Promise.reject({
          json: () => Promise.reject(Error('error'))
        })
      ) as jest.Mock;
      const store = configureStore({
        reducer: { order: orderSlice.reducer }
      });
      await store.dispatch(getOrderByNumber.rejected(Error('error'), '', 2));
      const { isLoading, error } = store.getState().order;
      expect(error).toBe('error');
      expect(isLoading).toBe(false);
    });
  });
});
