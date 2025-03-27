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

export const fetchOrders = createAsyncThunk(
  'orders/fetch',
  async () => await getOrdersApi()
);

export const fetchOrder = createAsyncThunk(
  'order/fetch',
  async (orderApi: number) => {
    const res = await getOrderByNumberApi(orderApi);

    return res.orders[0];
  }
);

export const createOrder = createAsyncThunk(
  'order/create',
  async (order: string[]) => await orderBurgerApi(order)
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderModal(state) {
      state.order = null;
    }
  },
  selectors: {
    getOrdersSelector: (state) => state.orders,
    getOrdersIsLoadingSelector: (state) => state.isLoadingOrders,
    getOrderSelector: (state) => state.order,
    getOrderIsLoadingSelector: (state) => state.isLoadingOrder,
    getOrderRequestSelector: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoadingOrders = true;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoadingOrders = false;
        state.error = action.error;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoadingOrders = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.isLoadingOrder = true;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.isLoadingOrder = false;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoadingOrder = false;
        state.order = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
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

export const { resetOrderModal } = ordersSlice.actions;
