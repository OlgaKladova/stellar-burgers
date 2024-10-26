import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredients } from './actions';
import { TIngredient } from '../../utils/types';
type TIngredientsSlice = {
  ingredients: TIngredient[];
  isLoading: boolean;
  buns: TIngredient[];
  main: TIngredient[];
  sauces: TIngredient[];
};

export const initialState: TIngredientsSlice = {
  ingredients: [],
  isLoading: false,
  buns: [],
  main: [],
  sauces: []
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getIsLoading: (state) => state.isLoading,
    getBuns: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    getMain: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    getSauces: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce')
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      });
  }
});

export const {
  getIngredientsSelector,
  getIsLoading,
  getBuns,
  getMain,
  getSauces
} = ingredientsSlice.selectors;
