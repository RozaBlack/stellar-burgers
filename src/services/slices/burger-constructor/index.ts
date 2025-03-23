//import { nanoid } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';

type TBurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBurgerIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;
        if (ingredient?.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.ingredients.push(ingredient);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeBurgerInredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveBurgerIngredient(
      state,
      action: PayloadAction<{
        ingredient: TConstructorIngredient;
        moveUp: boolean;
      }>
    ) {
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload.ingredient.id
      );
      if (action.payload.moveUp) {
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index - 1, 0, action.payload.ingredient);
      } else {
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index + 1, 0, action.payload.ingredient);
      }
    },
    resetConstructor(state) {
      state = initialState;
    }
  },
  selectors: {
    getBurgerIngredientSelector: (state) => state
  }
});

export const { getBurgerIngredientSelector } = burgerConstructorSlice.selectors;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const {
  addBurgerIngredient,
  removeBurgerInredient,
  moveBurgerIngredient,
  resetConstructor
} = burgerConstructorSlice.actions;
