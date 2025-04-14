import { describe, expect, test } from '@jest/globals';
import { initialState, userReducer, fetchUser, registerUser, loginUser, logoutUser, updateUser} from '../src/services/slices/user'

const userMockData =  {
  "success":true,
  "user":
  {
    "email":"alenabulisova@yandex.ru",
    "name":"Alena1"
  }
}

const registerMockData = {
  "email": 'user@user.ru',
  "name": 'User',
  "password": 'User123'
}

const loginMockData = {
  "email": 'user@user.ru',
  "password": 'User123'
}


describe( 'Проверка userReducer', () => {
  describe('Проверка функции получения данных пользователя fetchUser', () => {
    test('Вызов экшена Request: fetchUser.pending', async() => {
      const state = userReducer(
        initialState,
        fetchUser.pending('pending')
      );
  
      expect(state.error).toEqual(null);
    }) 
  
    test('Вызов экшена Success: fetchUser.fulfilled', async() => {
      const state = userReducer(
        initialState,
        fetchUser.fulfilled(userMockData, 'fulfilled')
      );
  
      expect(state.user).toEqual(userMockData.user);
      expect(state.isAuthChecked).toEqual(true);
      expect(state.isAuthenticated).toEqual(true);
    }) 
  
    test('Вызов экшена Failed: fetchUser.rejected', async() => {
      const error = new Error('some error');
      const state = userReducer(
        initialState,
        fetchUser.rejected(error, 'rejected')
      );
  
      expect(state.isAuthChecked).toEqual(true);
      expect(state.error?.message).toEqual(error.message);
    }) 
  })

  describe('Проверка функции регистрации пользователя registerUser', () => {
    test('Вызов экшена Request: registerUser.pending', async() => {
      const state = userReducer(
        initialState,
        registerUser.pending('pending', registerMockData)
      );
  
      expect(state.registerError).toEqual(null);
    }) 
  
    test('Вызов экшена Success: registerUser.fulfilled', async() => {
      const state = userReducer(
        initialState,
        registerUser.fulfilled(userMockData, 'fulfilled', registerMockData)
      );
  
      expect(state.user).toEqual(userMockData.user);
      expect(state.registerError).toEqual(null);
      expect(state.isAuthenticated).toEqual(true);
    }) 
  
    test('Вызов экшена Failed: registerUser.rejected', async() => {
      const error = new Error('some error');
      const state = userReducer(
        initialState,
        registerUser.rejected(error, 'rejected', registerMockData)
      );
  
      expect(state.registerError?.message).toEqual(error.message);
    }) 
  })

  describe('Проверка функции авторизации пользователя loginUser', () => {
    test('Вызов экшена Request: loginUser.pending', async() => {
      const state = userReducer(
        initialState,
        loginUser.pending('pending', loginMockData)
      );
  
      expect(state.loginError).toEqual(null);
    }) 
  
    test('Вызов экшена Success: loginUser.fulfilled', async() => {
      const state = userReducer(
        initialState,
        loginUser.fulfilled(userMockData, 'fulfilled', loginMockData)
      );
  
      expect(state.user).toEqual(userMockData.user);
      expect(state.loginError).toEqual(null);
      expect(state.isAuthenticated).toEqual(true);
    }) 
  
    test('Вызов экшена Failed: loginUser.rejected', async() => {
      const error = new Error('some error');
      const state = userReducer(
        initialState,
        loginUser.rejected(error, 'rejected', loginMockData)
      );
  
      expect(state.loginError?.message).toEqual(error.message);
    }) 
  })

  describe('Проверка функции разлогинивания пользователя logoutUser', () => {
    test('Вызов экшена Request: logoutUser.pending', async() => {
      const state = userReducer(
        initialState,
        logoutUser.pending('pending')
      );
  
      expect(state.error).toEqual(null);
    }) 
  
    test('Вызов экшена Success: logoutUser.fulfilled', async() => {
      const state = userReducer(
        initialState,
        logoutUser.fulfilled(undefined, 'fulfilled')
      );
  
      expect(state.user).toEqual(initialState.user);
      expect(state.error).toEqual(null);
      expect(state.isAuthenticated).toEqual(false);
    }) 
  
    test('Вызов экшена Failed: logoutUser.rejected', async() => {
      const error = new Error('some error');
      const state = userReducer(
        initialState,
        logoutUser.rejected(error, 'rejected')
      );
  
      expect(state.error?.message).toEqual(error.message);
    }) 
  })

  describe('Проверка функции редактирования инфориации пользователя updateUser', () => {
    test('Вызов экшена Request: updateUser.pending', async() => {
      const state = userReducer(
        initialState,
        updateUser.pending('pending', userMockData)
      );
  
      expect(state.error).toEqual(null);
    }) 
  
    test('Вызов экшена Success: updateUser.fulfilled', async() => {
      const state = userReducer(
        initialState,
        updateUser.fulfilled(userMockData, 'fulfilled', userMockData)
      );
  
      expect(state.user).toEqual(userMockData.user);
      expect(state.error).toEqual(null);
    }) 
  
    test('Вызов экшена Failed: updateUser.rejected', async() => {
      const error = new Error('some error');
      const state = userReducer(
        initialState,
        updateUser.rejected(error, 'rejected', userMockData)
      );
  
      expect(state.error?.message).toEqual(error.message);
    }) 
  })

});