import { createReducer, on } from '@ngrx/store';
import { OrderState } from '../../shared/models/order.model';
import * as OrderActions from './order.actions';

export type { OrderState } from '../../shared/models/order.model';

export const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,

  // Load User Orders
  on(OrderActions.loadUserOrders, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrderActions.loadUserOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    loading: false,
    error: null
  })),
  on(OrderActions.loadUserOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load Single Order
  on(OrderActions.loadOrder, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrderActions.loadOrderSuccess, (state, { order }) => ({
    ...state,
    selectedOrder: order,
    loading: false,
    error: null
  })),
  on(OrderActions.loadOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create Order
  on(OrderActions.createOrder, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrderActions.createOrderSuccess, (state, { order }) => ({
    ...state,
    orders: [...state.orders, order],
    selectedOrder: order,
    loading: false,
    error: null
  })),
  on(OrderActions.createOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Order Status
  on(OrderActions.updateOrderStatus, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrderActions.updateOrderStatusSuccess, (state, { order }) => ({
    ...state,
    orders: state.orders.map(o => o.id === order.id ? order : o),
    selectedOrder: state.selectedOrder?.id === order.id ? order : state.selectedOrder,
    loading: false,
    error: null
  })),
  on(OrderActions.updateOrderStatusFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Cancel Order
  on(OrderActions.cancelOrder, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrderActions.cancelOrderSuccess, (state, { order }) => ({
    ...state,
    orders: state.orders.map(o => o.id === order.id ? order : o),
    selectedOrder: state.selectedOrder?.id === order.id ? order : state.selectedOrder,
    loading: false,
    error: null
  })),
  on(OrderActions.cancelOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Track Order
  on(OrderActions.trackOrder, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrderActions.trackOrderSuccess, state => ({
    ...state,
    loading: false,
    error: null
  })),
  on(OrderActions.trackOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Select Order
  on(OrderActions.selectOrder, (state, { order }) => ({
    ...state,
    selectedOrder: order
  }))
);
