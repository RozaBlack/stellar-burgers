import { getIngredientsApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientState = {
  isLoading: boolean;
  error: null | SerializedError;
  ingredients: TIngredient[];
};

const initialState: TIngredientState = {
  isLoading: true,
  error: null,
  ingredients: []
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  async () => await getIngredientsApi()
);

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getIngredientIsLoadingSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        //console.log(`pending`);
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        //console.log('rejected');
        //console.log(action.error);
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        //console.log(`fulfilled: ${action.payload}`);
        state.isLoading = false;
        state.ingredients = action.payload;
        //console.log(action.payload);
      });
  }
});

export const { getIngredientsSelector, getIngredientIsLoadingSelector } =
  ingredientSlice.selectors;
export const ingredientReducer = ingredientSlice.reducer;
