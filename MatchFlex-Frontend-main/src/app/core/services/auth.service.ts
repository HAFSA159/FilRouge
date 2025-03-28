import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';
import { API_CONFIG } from './api-config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${API_CONFIG.baseUrl}/auth`;

  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient) {}

  login(
    email: string,
    password: string
  ): Observable<{ role: string; token: string }> {
    return this.http
      .post<{ role: string; token: string }>(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        map((response) => {
          localStorage.setItem('token', response.token);
          return response;
        }),
        catchError((error) => {
          console.error('Login error', error);
          return throwError(
            () => new Error(error.error.message || 'Login failed')
          );
        })
      );
  }

  register(userData: any, password: string): Observable<any> {
    const registrationData = {
      ...userData,
      password: password,
    };
    return this.http
      .post<any>(`${this.apiUrl}/register`, registrationData)
      .pipe(
        map((response) => {
          // Stocker le token
          localStorage.setItem('token', response.token);
          return response.user;
        }),
        catchError((error) => {
          console.error('Registration error', error);
          return throwError(
            () => new Error(error.error.message || 'Registration failed')
          );
        })
      );
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('token');
    return of(true);
  }

  getCurrentUser(): Observable<User | null> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(null);
    }

    return this.http.get<{ user: User }>(`${this.apiUrl}/me`).pipe(
      map((response) => response.user),
      catchError((error) => {
        console.error('Get current user error', error);
        localStorage.removeItem('token');
        return of(null);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  getToken(): string {
    return localStorage.getItem('token') as string;
  }
}
