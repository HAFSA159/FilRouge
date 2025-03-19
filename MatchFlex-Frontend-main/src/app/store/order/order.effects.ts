import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrderService } from '../../core/services/order.service';
import * as OrderActions from './order.actions';

@Injectable()
export class OrderEffects {
  loadUserOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadUserOrders),
      switchMap(() =>
        this.orderService.getUserOrders().pipe(
          map(orders => OrderActions.loadUserOrdersSuccess({ orders })),
          catchError(error => of(OrderActions.loadUserOrdersFailure({ error: error.message })))
        )
      )
    )
  );

  loadOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrder),
      switchMap(({ id }) =>
        this.orderService.getOrderById(id).pipe(
          map(order => OrderActions.loadOrderSuccess({ order })),
          catchError(error => of(OrderActions.loadOrderFailure({ error: error.message })))
        )
      )
    )
  );

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.createOrder),
      switchMap(({ order }) =>
        this.orderService.createOrder(order).pipe(
          map(newOrder => OrderActions.createOrderSuccess({ order: newOrder })),
          catchError(error => of(OrderActions.createOrderFailure({ error: error.message })))
        )
      )
    )
  );

  updateOrderStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.updateOrderStatus),
      switchMap(({ id, status }) =>
        this.orderService.updateOrderStatus(id, status).pipe(
          map(updatedOrder => OrderActions.updateOrderStatusSuccess({ order: updatedOrder })),
          catchError(error => of(OrderActions.updateOrderStatusFailure({ error: error.message })))
        )
      )
    )
  );

  cancelOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.cancelOrder),
      switchMap(({ id }) =>
        this.orderService.cancelOrder(id).pipe(
          map(cancelledOrder => OrderActions.cancelOrderSuccess({ order: cancelledOrder })),
          catchError(error => of(OrderActions.cancelOrderFailure({ error: error.message })))
        )
      )
    )
  );

  trackOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.trackOrder),
      switchMap(({ id }) =>
        this.orderService.trackOrder(id).pipe(
          map(trackingInfo => OrderActions.trackOrderSuccess({ trackingInfo })),
          catchError(error => of(OrderActions.trackOrderFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private orderService: OrderService
  ) {}
}
