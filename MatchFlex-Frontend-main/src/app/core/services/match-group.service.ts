import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_CONFIG } from './api-config';

export interface Group {
  groupId?: number;
  name: string;
  countries: string[];
  flags: string[];
}

@Injectable({
  providedIn: 'root',
})
export class MatchGroupService {
  private apiUrl = `${API_CONFIG.baseUrl}/match-groups`;

  constructor(private http: HttpClient) {}

  getAllAvailableGroups(): Observable<Group[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Group[]>(`${this.apiUrl}/available`,  { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching available match groups', error);
        return throwError(
          () => new Error('Failed to load available match groups')
        );
      })
    );
  }

  createGroupe(groupData: Group): Observable<Group> {
    return this.http
      .post<Group>(`${this.apiUrl}/create-groupe`, groupData)
      .pipe(
        catchError((error) => {
          console.error('Error creating group', error);
          return throwError(() => new Error('Failed to create the group'));
        })
      );
  }

  // Dans match-group.service.ts
  getAccessibleGroups(): Observable<Group[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Group[]>(`${this.apiUrl}/user`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching user match groups', error);
        return throwError(() => new Error('Failed to load your match groups'));
      })
    );
  }
  getGroupById(id: number): Observable<Group> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Group>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error(`Error fetching group ${id}`, error);
        return throwError(() => new Error('Failed to load group details'));
      })
    );
  }
}
