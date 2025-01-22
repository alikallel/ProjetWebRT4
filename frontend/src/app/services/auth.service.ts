import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http.post('http://localhost:3000/auth/register', { email, password });
  }

  login(email: string, password: string) {
    return this.http.post('http://localhost:3000/auth/login', { email, password });
  }
}
