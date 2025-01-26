import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import { User } from '../models/user.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private tokenKey = 'accessToken';

  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { email, password }).pipe(
      catchError(this.handleError)
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      catchError(this.handleError),
      // On successful login, store the token in local storage
      tap((response: any) => {
        localStorage.setItem(this.tokenKey, response.accessToken);
      })
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  updateUser(id: number, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, userData).pipe(catchError(this.handleError));
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(() => new Error(error.message || 'Something went wrong'));
  }
}
