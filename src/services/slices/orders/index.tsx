import { getOrdersApi, orderBurgerApi, getOrderByNumberApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrdersState = {
  isLoadingOrders: boolean;
  isLoadingOrder: boolean;
  orderRequest: boolean;
  error: null | SerializedError;
  orders: TOrder[];
  order: TOrder | null;
};

const initialState: TOrdersState = {
  isLoadingOrders: true,
  isLoadingOrder: true,
  orderRequest: false,
  error: null,
  orders: [],
  order: null
};

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async () => await getOrdersApi()
);

export const getOrder = createAsyncThunk(
  'orders/getOrder',
  async (orderApi: number) => await getOrderByNumberApi(orderApi)
);

export const createOrder = createAsyncThunk(
  'order/create',
  async (order: string[]) => await orderBurgerApi(order)
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrdersSelector: (state) => state.orders,
    getOrdersIsLoadingSelector: (state) => state.isLoadingOrders,
    getOrderSelector: (state) => state.order,
    getOrderIsLoadingSelector: (state) => state.isLoadingOrder,
    getOrderRequestSelector: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        //console.log(`pending`);
        state.isLoadingOrders = true;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        //console.log('rejected');
        //console.log(action.error);
        state.isLoadingOrders = false;
        state.error = action.error;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        //console.log(`fulfilled: ${action.payload}`);
        state.isLoadingOrders = false;
        state.orders = action.payload;
        //console.log(action.payload);
      })
      .addCase(getOrder.pending, (state) => {
        //console.log(`pending`);
        state.isLoadingOrder = true;
        state.error = null;
      })
      .addCase(getOrder.rejected, (state, action) => {
        //console.log('rejected');
        //console.log(action.error);
        state.isLoadingOrder = false;
        state.error = action.error;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        //console.log(`fulfilled: ${action.payload}`);
        state.isLoadingOrder = false;
        state.orders = action.payload.orders;
        //console.log(action.payload);
      })
      .addCase(createOrder.pending, (state) => {
        //console.log(`pending`);
        state.orderRequest = true;
      })
      .addCase(createOrder.rejected, (state) => {
        //console.log('rejected');
        //console.log(action.error);
        state.orderRequest = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        //console.log(`fulfilled: ${action.payload}`);
        state.orderRequest = false;
        state.order = action.payload.order;
        //console.log(action.payload);
      });
  }
});

export const {
  getOrdersSelector,
  getOrdersIsLoadingSelector,
  getOrderSelector,
  getOrderIsLoadingSelector,
  getOrderRequestSelector
} = ordersSlice.selectors;
