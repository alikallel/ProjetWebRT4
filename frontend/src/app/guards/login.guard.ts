import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  private jwtHelper = new JwtHelperService();

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    if (this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('accessToken');
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      if (!decodedToken) {
        throw new Error('Invalid token');
      }
      return true;
    } catch (error) {
      localStorage.removeItem('accessToken');
      this.router.navigate(['/login']);
      return false;
    }
  }
}