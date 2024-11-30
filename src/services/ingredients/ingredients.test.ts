import { configureStore } from '@reduxjs/toolkit';
import { getIngredients } from './actions';
import { ingredientsSlice } from './slice';
import { error } from 'console';

describe('Проверка редьюсера слайса ingredients', () => {
  test('сотояние загрузки ингредиентов', async () => {
    global.fetch = jest.fn() as jest.Mock;
    const store = configureStore({
      reducer: { ingredients: ingredientsSlice.reducer }
    });
    await store.dispatch(getIngredients.pending(''));
    const { isLoading } = store.getState().ingredients;
    expect(isLoading).toBe(true);
  });

  test('состояние успешного получения ингредиентов', async () => {
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
      reducer: { ingredients: ingredientsSlice.reducer }
    });

    await store.dispatch(getIngredients.fulfilled(expectedResult, ''));
    const { ingredients, isLoading } = store.getState().ingredients;
    expect(ingredients).toEqual(expectedResult);
    expect(isLoading).toBe(false);
  });

  test('получение ошибки при загрузке ингредиентов', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject({
        json: () => Promise.reject(Error('error'))
      })
    ) as jest.Mock;
    const store = configureStore({
      reducer: { ingredients: ingredientsSlice.reducer }
    });
    await store.dispatch(getIngredients.rejected(Error('error'), ''));
    const { isLoading, error } = store.getState().ingredients;
    expect(error).toBe('error');
    expect(isLoading).toBe(false);
  });
});
