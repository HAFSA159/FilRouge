import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from '../../shared/models/order.model';

export const selectOrderState = createFeatureSelector<OrderState>('orders');

export const selectAllOrders = createSelector(
  selectOrderState,
  (state: OrderState) => state.orders
);

export const selectSelectedOrder = createSelector(
  selectOrderState,
  (state: OrderState) => state.selectedOrder
);

export const selectOrderLoading = createSelector(
  selectOrderState,
  (state: OrderState) => state.loading
);

export const selectOrderError = createSelector(
  selectOrderState,
  (state: OrderState) => state.error
);

export const selectOrdersByStatus = (status: string) => createSelector(
  selectAllOrders,
  orders => orders.filter(order => order.status === status)
);

export const selectOrdersSortedByDate = createSelector(
  selectAllOrders,
  orders => [...orders].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
);
