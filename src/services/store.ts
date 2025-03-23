import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientSlice } from './slices/ingredients';
import { burgerConstructorSlice } from './slices/burger-constructor';
import { ordersSlice } from './slices/orders';
import { feedsSlice } from './slices/feeds';
import { userSlice } from './slices/user';

const rootReducer = {
  ingredients: ingredientSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  orders: ordersSlice.reducer,
  feeds: feedsSlice.reducer,
  user: userSlice.reducer
}; //() => {}; // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
