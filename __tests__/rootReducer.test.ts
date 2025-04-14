import { describe, expect, test } from '@jest/globals';
import { rootReducer, store } from '../src/services/store'

describe( 'Проверка инициализации RootReducer', () => {
  test('Вызов RootReducer с underfined состоянием и UNKNOWN_ACTION возвращает корректное начальное состояние хранилища', () => {
    const previouse_store = store.getState();

    const next_store = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(next_store).toEqual(previouse_store);
  }) 

})