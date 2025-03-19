import { createAction, props } from '@ngrx/store';
import { Order } from '../../shared/models/order.model';

// Load User Orders
export const loadUserOrders = createAction('[Order] Load User Orders');
export const loadUserOrdersSuccess = createAction(
  '[Order] Load User Orders Success',
  props<{ orders: Order[] }>()
);
export const loadUserOrdersFailure = createAction(
  '[Order] Load User Orders Failure',
  props<{ error: string }>()
);

// Load Single Order
export const loadOrder = createAction(
  '[Order] Load Order',
  props<{ id: string }>()
);
export const loadOrderSuccess = createAction(
  '[Order] Load Order Success',
  props<{ order: Order }>()
);
export const loadOrderFailure = createAction(
  '[Order] Load Order Failure',
  props<{ error: string }>()
);

// Create Order
export const createOrder = createAction(
  '[Order] Create Order',
  props<{ order: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'> }>()
);
export const createOrderSuccess = createAction(
  '[Order] Create Order Success',
  props<{ order: Order }>()
);
export const createOrderFailure = createAction(
  '[Order] Create Order Failure',
  props<{ error: string }>()
);

// Update Order Status
export const updateOrderStatus = createAction(
  '[Order] Update Order Status',
  props<{ id: string; status: Order['status'] }>()
);
export const updateOrderStatusSuccess = createAction(
  '[Order] Update Order Status Success',
  props<{ order: Order }>()
);
export const updateOrderStatusFailure = createAction(
  '[Order] Update Order Status Failure',
  props<{ error: string }>()
);

// Cancel Order
export const cancelOrder = createAction(
  '[Order] Cancel Order',
  props<{ id: string }>()
);
export const cancelOrderSuccess = createAction(
  '[Order] Cancel Order Success',
  props<{ order: Order }>()
);
export const cancelOrderFailure = createAction(
  '[Order] Cancel Order Failure',
  props<{ error: string }>()
);

// Track Order
export const trackOrder = createAction(
  '[Order] Track Order',
  props<{ id: string }>()
);
export const trackOrderSuccess = createAction(
  '[Order] Track Order Success',
  props<{ trackingInfo: any }>()
);
export const trackOrderFailure = createAction(
  '[Order] Track Order Failure',
  props<{ error: string }>()
);

// Select Order
export const selectOrder = createAction(
  '[Order] Select Order',
  props<{ order: Order | null }>()
);
