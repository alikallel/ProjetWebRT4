import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http.post('http://localhost:3000/auth/register', { email, password });
  }

  login(email: string, password: string) {
    return this.http.post('http://localhost:3000/auth/login', { email, password });
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: number,  userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, userData);
  }
}
