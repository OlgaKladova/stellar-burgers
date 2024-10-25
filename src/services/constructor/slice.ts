import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { TConstructorIngredient } from '@utils-types';
export type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => ({
        bun: action.payload,
        ingredients: state.ingredients
      }),
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return {
          payload: {
            ...ingredient,
            id
          }
        };
      }
    },
    addIngredients: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => ({
        bun: state.bun,
        ingredients:
          state.ingredients === undefined
            ? [action.payload]
            : [...state.ingredients, action.payload]
      }),
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return {
          payload: {
            ...ingredient,
            id
          }
        };
      }
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveDown: (state, action: PayloadAction<number>) => {
      [
        state.ingredients[action.payload],
        state.ingredients[action.payload + 1]
      ] = [
        state.ingredients[action.payload + 1],
        state.ingredients[action.payload]
      ];
    },
    moveUp: (state, action: PayloadAction<number>) => {
      [
        state.ingredients[action.payload - 1],
        state.ingredients[action.payload]
      ] = [
        state.ingredients[action.payload],
        state.ingredients[action.payload - 1]
      ];
    },
    clearConstructor: () => initialState
  },
  selectors: {
    getBun: (state) => state.bun,
    getIngredients: (state) => state.ingredients
  }
});

export const {
  addBun,
  addIngredients,
  deleteIngredient,
  moveDown,
  moveUp,
  clearConstructor
} = constructorSlice.actions;
export const { getBun, getIngredients } = constructorSlice.selectors;
