import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  register(email: string, password: string, username: string, role: string, gender: string, birthdate: Date) {
    const payload = { email, password, username, role, gender, birthdate };
    return this.http.post(`${this.apiUrl}/register`, payload).pipe(
      catchError(this.handleError)
    );
  }
  

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      catchError(this.handleError),
      tap((response: any) => {
        localStorage.setItem(this.tokenKey, response.accessToken);
        localStorage.setItem('userRole', response.role); 
        console.log('User role:', response.role);
      })
    );
  }
  getCurrentUser(): Observable<User> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/me`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
  
  private apiUrl2 = 'http://localhost:3000/user';
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl2}/${id}`).pipe(catchError(this.handleError));
  }

  updateUser(id: number, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl2}/${id}`, userData).pipe(catchError(this.handleError));
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
