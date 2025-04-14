import { describe, expect, test } from '@jest/globals';
import { ingredientReducer, initialState, fetchFeeds} from '../src/services/slices/feeds'

const feedsMockData =  {
  "orders": [
        {
            "_id": "67fa6f62e8e61d001cec21cc",
            "ingredients": [
                "643d69a5c3f7b9001cfa093c",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa093c"
            ],
            "status": "done",
            "name": "Краторный люминесцентный бургер",
            "createdAt": "2025-04-12T13:49:22.770Z",
            "updatedAt": "2025-04-12T13:49:23.465Z",
            "number": 74402
        },
        {
            "_id": "67fa61ade8e61d001cec21a5",
            "ingredients": [
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Флюоресцентный люминесцентный бургер",
            "createdAt": "2025-04-12T12:50:53.946Z",
            "updatedAt": "2025-04-12T12:50:54.642Z",
            "number": 74398
        },
        {
            "_id": "67fa5de5e8e61d001cec2189",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa094a",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Астероидный флюоресцентный бургер",
            "createdAt": "2025-04-12T12:34:45.210Z",
            "updatedAt": "2025-04-12T12:34:45.946Z",
            "number": 74396
        }
    ],
    "total": 74029,
    "totalToday": 103
  }


describe( 'Проверка feedsReducer', () => {
  test('Вызов экшена Request: fetchFeeds.pending', async() => {
    const state = ingredientReducer(
      initialState,
      fetchFeeds.pending('pending')
    );

    expect(state.isLoading).toEqual(true);
    expect(state.error).toEqual(null);
  }) 

  test('Вызов экшена Success: fetchFeeds.fulfilled', async() => {
    const state = ingredientReducer(
      initialState,
      fetchFeeds.fulfilled(feedsMockData, 'fulfilled')
    );

    expect(state.feeds).toEqual(feedsMockData);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(null);
  }) 

  test('Вызов экшена Failed: fetchFeeds.rejected', async() => {
    const error = new Error('some error');
    const state = ingredientReducer(
      initialState,
      fetchFeeds.rejected(error, 'rejected')
    );

    expect(state.isLoading).toEqual(false);
    expect(state.error?.message).toEqual(error.message);
  }) 
});