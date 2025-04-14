import { describe, expect, test } from '@jest/globals';
import { initialState, ordersReducer, resetOrderModal, fetchOrder, fetchOrders, createOrder} from '../src/services/slices/orders'

const ordersMockData =  [
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
    ]


describe( 'Проверка ordersReducer', () => {
  describe('Проверка функции получения заказов fetchOrders', () => {
    test('Вызов экшена Request: fetchOrders.pending', async() => {
      const state = ordersReducer(
        initialState,
        fetchOrders.pending('pending')
      );
  
      expect(state.isLoadingOrders).toEqual(true);
      expect(state.error).toEqual(null);
    }) 
  
    test('Вызов экшена Success: fetchOrders.fulfilled', async() => {
      const state = ordersReducer(
        initialState,
        fetchOrders.fulfilled(ordersMockData, 'fulfilled')
      );
  
      expect(state.orders).toEqual(ordersMockData);
      expect(state.isLoadingOrders).toEqual(false);
      expect(state.error).toEqual(null);
    }) 
  
    test('Вызов экшена Failed: fetchOrders.rejected', async() => {
      const error = new Error('some error');
      const state = ordersReducer(
        initialState,
        fetchOrders.rejected(error, 'rejected')
      );
  
      expect(state.isLoadingOrders).toEqual(false);
      expect(state.error?.message).toEqual(error.message);
    }) 
  })

  describe('Проверка функции получения заказа по номеру fetchOrder', () => {
    test('Вызов экшена Request: fetchOrder.pending', async() => {
      const state = ordersReducer(
        initialState,
        fetchOrder.pending('pending', ordersMockData[1].number)
      );
  
      expect(state.isLoadingOrder).toEqual(true);
    }) 
  
    test('Вызов экшена Success: fetchOrder.fulfilled', async() => {
      const state = ordersReducer(
        initialState,
        fetchOrder.fulfilled(ordersMockData[1], 'fulfilled', ordersMockData[1].number)
      );
  
      expect(state.order).toEqual(ordersMockData[1]);
      expect(state.isLoadingOrder).toEqual(false);
    }) 
  
    test('Вызов экшена Failed: fetchOrder.rejected', async() => {
      const error = new Error('some error');
      const state = ordersReducer(
        initialState,
        fetchOrder.rejected(error, 'rejected', ordersMockData[1].number)
      );
  
      expect(state.isLoadingOrder).toEqual(false);
    }) 
  })

  describe('Проверка функции создания заказа createOrder', () => {
    test('Вызов экшена Request: createOrder.pending', async() => {
      const state = ordersReducer(
        initialState,
        createOrder.pending('pending', ordersMockData[2].ingredients)
      );
  
      expect(state.orderRequest).toEqual(true);
    }) 
  
    test('Вызов экшена Success: createOrder.fulfilled', async() => {
      const state = ordersReducer(
        initialState,
        createOrder.fulfilled({order: ordersMockData[2], name: "newOrder"}, 'fulfilled', ordersMockData[2].ingredients)
      );
  
      expect(state.order).toEqual(ordersMockData[2]);
      expect(state.orderRequest).toEqual(false);
    }) 
  
    test('Вызов экшена Failed: createOrder.rejected', async() => {
      const error = new Error('some error');
      const state = ordersReducer(
        initialState,
        createOrder.rejected(error, 'rejected', ordersMockData[2].ingredients)
      );
  
      expect(state.orderRequest).toEqual(false);
    }) 
  })

  describe('Проверка функции сброса данных заказа', () => {
    test('Отчистить конструктор ингредиетнов', () => {
      const someState = {
        isLoadingOrders: false,
        isLoadingOrder: false,
        orderRequest: true,
        error: null,
        orders: ordersMockData,
        order: ordersMockData[2]
      }
      const newState = ordersReducer( someState, resetOrderModal() );

      expect(newState.order).toEqual(initialState.order);
      expect(newState.isLoadingOrder).toEqual(someState.isLoadingOrder);
      expect(newState.isLoadingOrders).toEqual(someState.isLoadingOrders);
      expect(newState.orderRequest).toEqual(someState.orderRequest);
      expect(newState.error).toEqual(someState.error);
      expect(newState.orders).toEqual(someState.orders);

    })
  })

});