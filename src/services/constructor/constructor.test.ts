import {
  addBun,
  addIngredients,
  deleteIngredient,
  moveDown,
  moveUp,
  clearConstructor,
  TConstructorState,
  constructorSlice
} from './slice';

describe('Проверка редьюсера слайса constructor', () => {
  const initialState: TConstructorState = {
    bun: null,
    ingredients: [
      {
        id: '564633566567',
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
        id: '25564789',
        _id: '2',
        name: 'test',
        type: 'main',
        proteins: 28734,
        fat: 8098,
        carbohydrates: 8,
        calories: 4,
        price: 500,
        image: 'test.png',
        image_large: 'test.png',
        image_mobile: 'test.png'
      }
    ]
  };

  test('обработка экшена добавления булки', () => {
    const newState = constructorSlice.reducer(
      initialState,
      addBun({
        _id: '9',
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
      })
    );
    const { bun } = newState;
    expect(bun).not.toBeNull();
  });

  test('обработка экшена добавления ингредиента', () => {
    const newState = constructorSlice.reducer(
      initialState,
      addIngredients({
        _id: '3',
        name: 'test',
        type: 'sauces',
        proteins: 124,
        fat: 32,
        carbohydrates: 86,
        calories: 345,
        price: 10,
        image: 'test.png',
        image_large: 'test.png',
        image_mobile: 'test.png'
      })
    );
    const { ingredients } = newState;
    expect(ingredients).toHaveLength(3);
  });

  test('обработка экшена удаления ингредиента', () => {
    const newState = constructorSlice.reducer(
      initialState,
      deleteIngredient('25564789')
    );
    const { ingredients } = newState;
    expect(ingredients).toHaveLength(1);
    expect(ingredients).toEqual([
      {
        id: '564633566567',
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
      }
    ]);
  });

  test('обработка экшена поднятие ингредиента в начинке на уровень выше', () => {
    const newState = constructorSlice.reducer(initialState, moveUp(1));
    const { ingredients } = newState;
    expect(ingredients).toEqual([
      {
        id: '25564789',
        _id: '2',
        name: 'test',
        type: 'main',
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
        id: '564633566567',
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
      }
    ]);
  });

  test('обработка экшена смещения ингредиента в начинке на уровень ниже', () => {
    const newState = constructorSlice.reducer(initialState, moveDown(0));
    const { ingredients } = newState;
    expect(ingredients).toEqual([
      {
        id: '25564789',
        _id: '2',
        name: 'test',
        type: 'main',
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
        id: '564633566567',
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
      }
    ]);
  });

  test('обработка экшена очистки конструктора', () => {
    const newState = constructorSlice.reducer(initialState, clearConstructor());
    expect(newState).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
