import { Injectable } from '@angular/core';
import { API_CONFIG } from './api-config';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Match } from '../../features/components/Admin/match/match.component';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  private apiUrl = `${API_CONFIG.baseUrl}/matches`;

  constructor(private http: HttpClient) {}

  createMatch(matchData: Match): Observable<Match> {
    return this.http.post<Match>(`${this.apiUrl}/create`, matchData).pipe(
      catchError((error) => {
        console.error('Error fetching available Matches', error);
        return throwError(
          () => new Error('Failed to create available Matches')
        );
      })
    );
  }
}
