import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../../shared/models/order.model';
import { API_CONFIG } from './api-config';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${API_CONFIG.baseUrl}/orders`;

  constructor(private http: HttpClient) {}

  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/my-orders`)
      .pipe(
        catchError(error => {
          console.error('Error fetching user orders', error);
          return throwError(() => new Error(error.error.message || 'Failed to fetch orders'));
        })
      );
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error fetching order with id ${id}`, error);
          return throwError(() => new Error(error.error.message || 'Failed to fetch order details'));
        })
      );
  }

  createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order)
      .pipe(
        catchError(error => {
          console.error('Error creating order', error);
          return throwError(() => new Error(error.error.message || 'Failed to create order'));
        })
      );
  }

  updateOrderStatus(id: string, status: Order['status']): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/${id}/status`, { status })
      .pipe(
        catchError(error => {
          console.error(`Error updating order status for id ${id}`, error);
          return throwError(() => new Error(error.error.message || 'Failed to update order status'));
        })
      );
  }

  cancelOrder(id: string): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/${id}/cancel`, {})
      .pipe(
        catchError(error => {
          console.error(`Error cancelling order with id ${id}`, error);
          return throwError(() => new Error(error.error.message || 'Failed to cancel order'));
        })
      );
  }

  trackOrder(id: string): Observable<{
    order: Order;
    trackingInfo: {
      status: string;
      location: string;
      estimatedDelivery: Date;
      updates: { date: Date; status: string; location: string }[];
    }
  }> {
    return this.http.get<any>(`${this.apiUrl}/${id}/track`)
      .pipe(
        catchError(error => {
          console.error(`Error tracking order with id ${id}`, error);
          return throwError(() => new Error(error.error.message || 'Failed to track order'));
        })
      );
  }
}
