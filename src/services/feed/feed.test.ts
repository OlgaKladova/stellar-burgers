import { configureStore } from '@reduxjs/toolkit';
import { getFeeds, getIngredients, getOrderByNumber } from './actions';
import { feedSlice } from './slice';
describe('Проверка редьюсера слайса feed', () => {
  describe('обработка экшена getFeeds', () => {
    test('состояние загрузки', async () => {
      global.fetch = jest.fn() as jest.Mock;
      const store = configureStore({
        reducer: { feed: feedSlice.reducer }
      });
      await store.dispatch(getFeeds.pending(''));
      const { isLoading } = store.getState().feed;
      expect(isLoading).toBe(true);
    });

    test('состояние получения успешного ответа', async () => {
      const expectedResult = {
        success: true,
        orders: [
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
        ],
        total: 2,
        totalToday: 1
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(expectedResult)
        })
      ) as jest.Mock;

      const store = configureStore({
        reducer: { feed: feedSlice.reducer }
      });

      await store.dispatch(getFeeds.fulfilled(expectedResult, ''));
      const { orders, feed, isLoading } = store.getState().feed;
      expect(orders).toEqual(expectedResult.orders);
      expect(feed).toEqual(expectedResult);
      expect(isLoading).toBe(false);
    });

    test('состояние ошибки', async () => {
      global.fetch = jest.fn(() =>
        Promise.reject({
          json: () => Promise.reject(Error('error'))
        })
      ) as jest.Mock;
      const store = configureStore({
        reducer: { feed: feedSlice.reducer }
      });
      await store.dispatch(getFeeds.rejected(Error('error'), ''));
      const { isLoading, error } = store.getState().feed;
      expect(error).toBe('error');
      expect(isLoading).toBe(false);
    });
  });

  describe('обработка экшена getIngredients', () => {
    test('состояние загрузки', async () => {
      global.fetch = jest.fn() as jest.Mock;
      const store = configureStore({
        reducer: { feed: feedSlice.reducer }
      });
      await store.dispatch(getIngredients.pending(''));
      const { isLoading } = store.getState().feed;
      expect(isLoading).toBe(true);
    });

    test('состояние получения успешного ответа', async () => {
      const expectedResult = [
        {
          _id: '1',
          name: 'test',
          type: 'main',
          proteins: 908,
          fat: 565,
          carbohydrates: 87,
          calories: 453,
          price: 100500,
          image: 'test.png',
          image_large: 'test.png',
          image_mobile: 'test.png'
        },
        {
          _id: '2',
          name: 'test',
          type: 'sauces',
          proteins: 28734,
          fat: 8098,
          carbohydrates: 8,
          calories: 4,
          price: 500,
          image: 'test.png',
          image_large: 'test.png',
          image_mobile: 'test.png'
        },
        {
          _id: '3',
          name: 'test',
          type: 'bun',
          proteins: 124,
          fat: 32,
          carbohydrates: 86,
          calories: 345,
          price: 10,
          image: 'test.png',
          image_large: 'test.png',
          image_mobile: 'test.png'
        }
      ];

      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(expectedResult)
        })
      ) as jest.Mock;

      const store = configureStore({
        reducer: { feed: feedSlice.reducer }
      });

      await store.dispatch(getIngredients.fulfilled(expectedResult, ''));
      const { ingredients, isLoading } = store.getState().feed;
      expect(ingredients).toEqual(expectedResult);
      expect(isLoading).toBe(false);
    });

    test('состояние ошибки', async () => {
      global.fetch = jest.fn(() =>
        Promise.reject({
          json: () => Promise.reject(Error('error'))
        })
      ) as jest.Mock;
      const store = configureStore({
        reducer: { feed: feedSlice.reducer }
      });
      await store.dispatch(getIngredients.rejected(Error('error'), ''));
      const { isLoading, error } = store.getState().feed;
      expect(error).toBe('error');
      expect(isLoading).toBe(false);
    });
  });

  describe('обработка экшена getOrderByNumber', () => {
    test('состояние загрузки', async () => {
      global.fetch = jest.fn() as jest.Mock;
      const store = configureStore({
        reducer: { feed: feedSlice.reducer }
      });
      await store.dispatch(getOrderByNumber.pending('', 2));
      const { isLoading } = store.getState().feed;
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
        reducer: { feed: feedSlice.reducer }
      });

      await store.dispatch(getOrderByNumber.fulfilled(expectedResult, '', 2));
      const { order, isLoading } = store.getState().feed;
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
        reducer: { feed: feedSlice.reducer }
      });
      await store.dispatch(getOrderByNumber.rejected(Error('error'), '', 2));
      const { isLoading, error } = store.getState().feed;
      expect(error).toBe('error');
      expect(isLoading).toBe(false);
    });
  });
});
