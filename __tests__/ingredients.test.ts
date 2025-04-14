import { describe, expect, test } from '@jest/globals';
import { ingredientReducer, initialState, fetchIngredients, getIngredientsSelector, getIngredientIsLoadingSelector } from '../src/services/slices/ingredients'
import {configureStore } from '@reduxjs/toolkit';

const ingredientsMockData =  [
  {
      "_id": "643d69a5c3f7b9001cfa093c",
      "name": "Краторная булка N-200i",
      "type": "bun",
      "proteins": 80,
      "fat": 24,
      "carbohydrates": 53,
      "calories": 420,
      "price": 1255,
      "image": "https://code.s3.yandex.net/react/code/bun-02.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
      "__v": 0
  },
  {
      "_id": "643d69a5c3f7b9001cfa093e",
      "name": "Филе Люминесцентного тетраодонтимформа",
      "type": "main",
      "proteins": 44,
      "fat": 26,
      "carbohydrates": 85,
      "calories": 643,
      "price": 988,
      "image": "https://code.s3.yandex.net/react/code/meat-03.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
      "__v": 0
  },
  {
      "_id": "643d69a5c3f7b9001cfa0943",
      "name": "Соус фирменный Space Sauce",
      "type": "sauce",
      "proteins": 50,
      "fat": 22,
      "carbohydrates": 11,
      "calories": 14,
      "price": 80,
      "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
      "__v": 0
  }]


describe( 'Проверка ingredientReducer', () => {
  test('Вызов экшена Request: fetchIngredients.pending', async() => {
    const state = ingredientReducer(
      initialState,
      fetchIngredients.pending('pending')
    );

    expect(state.isLoading).toEqual(true);
    expect(state.error).toEqual(null);
  }) 

  test('Вызов экшена Success: fetchIngredients.fulfilled', async() => {
    const state = ingredientReducer(
      initialState,
      fetchIngredients.fulfilled(ingredientsMockData, 'fulfilled')
    );

    expect(state.ingredients).toEqual(ingredientsMockData);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(null);
  }) 

  test('Вызов экшена Failed: fetchIngredients.rejected', async() => {
    const error = new Error('some error');
    const state = ingredientReducer(
      initialState,
      fetchIngredients.rejected(error, 'fulfilled')
    );

    expect(state.isLoading).toEqual(false);
    expect(state.error?.message).toEqual(error.message);
  }) 
});

/*describe('Проверка получения списка ингредиентов', () => {
  test('При вызове функции fetchIngredients должен быть получен массив ингредиентов', async () => {

      global.fetch = jest.fn(() =>
          Promise.resolve({
              json: () => Promise.resolve(ingredientsMockData),
          })
      ) as jest.Mock;

      const store = configureStore({
          reducer: { ingredients: ingredientReducer }
      });

      await store.dispatch(fetchIngredients());

      const { ingredients } = store.getState().ingredients;
      
      expect(ingredients).toEqual(ingredientsMockData)
  })
});

describe('Проверка селекторов', () => {
  test('Получение списка ингредиентов', () => {
      const store = configureStore({
        reducer: {},
        preloadedState: { 
            ingredients: {
                ingredients: ingredientsMockData,
                isLoading: true
            }
        }
      });

      const ingredients = getIngredientsSelector(store.getState());
      expect(ingredients).toEqual(ingredientsMockData);
  });

  test('Получение состояние загрузки', () => {
    const store = configureStore({
      reducer: {},
      preloadedState: { 
          ingredients: {
              ingredients: ingredientsMockData,
              isLoading: false
          }
      }
    });

    const isLoading = getIngredientIsLoadingSelector(store.getState());
    expect(isLoading).toEqual(false);
});
})*/