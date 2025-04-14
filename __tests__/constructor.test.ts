import { describe, expect, test } from '@jest/globals';
import {
  burgerConstructorReducer,
  initialState,
  addBurgerIngredient,
  removeBurgerInredient,
  moveBurgerIngredient,
  resetConstructor
} from '../src/services/slices/burger-constructor'


  const bunMockData = {
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
  };

  const fillingMockData = {
      "id": "11111111",
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
  };

  const souseMockData = {
      "id": "22222222",
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
  }


describe( 'Проверка burgerConstructorReducer', () => {
  describe( 'Проверка добавления ингредиентов в бургер', () => {
    test('Добавить булку в список ингредиентов', () => {
      const newState = burgerConstructorReducer(initialState, addBurgerIngredient(bunMockData));

      const {id, ...newBun} = newState.bun;

      expect(newBun).toEqual(bunMockData);
      expect(newState.ingredients).toEqual(initialState.ingredients);
    }) 

    test('Добавить начинку в список ингредиентов', () => {
      const newState = burgerConstructorReducer(initialState, addBurgerIngredient(fillingMockData));

      const {id, ...newFilling} = newState.ingredients[0];
      const {id: initId, ... initFilling} = fillingMockData;

      expect(newFilling).toEqual(initFilling);
      expect(newState.bun).toEqual(initialState.bun);
    })

    test('Добавить соус в список ингредиентов', () => {
      const newState = burgerConstructorReducer(initialState, addBurgerIngredient(souseMockData));

      const {id, ...newSouse} = newState.ingredients[0];
      const {id: initId, ... initSouse} = souseMockData;

      expect(newSouse).toEqual(initSouse);
      expect(newState.bun).toEqual(initialState.bun);
    })
  })

  describe('Проверка удаления ингредиентов из бургера', () => {
    test('Удалить начинку из списка ингредиентов', () => {
      const ingredients = [fillingMockData, souseMockData];
      const newState = burgerConstructorReducer(
        {bun: bunMockData, ingredients: ingredients},
        removeBurgerInredient(souseMockData.id)
      );

      expect(newState.ingredients).toEqual([fillingMockData]);
      expect(newState.bun).toEqual(bunMockData);
    })

    test('Удалить соус из списка ингредиентов', () => {
      const ingredients = [fillingMockData, souseMockData];
      const newState = burgerConstructorReducer(
        {bun: bunMockData, ingredients: ingredients},
        removeBurgerInredient(fillingMockData.id)
      );

      expect(newState.ingredients).toEqual([souseMockData]);
      expect(newState.bun).toEqual(bunMockData);
    })
  })

  describe('Проверка изменения порядка ингредиентов в начинке', () => {
    test('Переместить начинку на одну позицию вверх', () => {
      const ingredients = [souseMockData, fillingMockData];
      const newState = burgerConstructorReducer(
        {bun: bunMockData, ingredients: ingredients},
        moveBurgerIngredient({ingredient: souseMockData, moveUp: false})
      );

      expect(newState.ingredients).toEqual([fillingMockData, souseMockData]);
      expect(newState.bun).toEqual(bunMockData);
    })

    test('Переместить начинку на одну позицию вниз', () => {
      const ingredients = [fillingMockData, souseMockData];
      const newState = burgerConstructorReducer(
        {bun: bunMockData, ingredients: ingredients},
        moveBurgerIngredient({ingredient: souseMockData, moveUp: true})
      );
      expect(newState.ingredients).toEqual([souseMockData, fillingMockData]);
      expect(newState.bun).toEqual(bunMockData);
    })
  })

  describe('Проверка отчистки конструктора ингредиентов', () => {
    test('Отчистить конструктор ингредиетнов', () => {
      const ingredients = [fillingMockData, souseMockData];
      const newState = burgerConstructorReducer(
        {bun: bunMockData, ingredients: ingredients},
        resetConstructor()
      );

      expect(newState.ingredients).toEqual(initialState.ingredients);
      expect(newState.bun).toEqual(initialState.bun);
    })
  })
});