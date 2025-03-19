// scan.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BandScan } from '../../shared/models/band-scan.model';
import { API_CONFIG } from './api-config';

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  private apiUrl = `${API_CONFIG.baseUrl}`;

  constructor(private http: HttpClient) {}

  getBandScans(): Observable<any[]> {
    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/smartbands/user`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

updateSelectedDate(selectedDate: string): Observable<any> {
  const authToken = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${authToken}`
  });

  return this.http.post(`${this.apiUrl}/bandscans/selected-date`, {
    selectedDate: selectedDate
  }, { headers })
    .pipe(
      catchError(this.handleError)
    );
}

  simulateScan(testDate: string): Observable<any> {
    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.post(`${this.apiUrl}/bandscans/test`, {
      testDate: testDate
    }, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Une erreur est survenue', error);
    return throwError(() => error);
  }
}
