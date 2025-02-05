import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userId: number | null = null; // Variable to store the user ID

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user: User) => {
        this.userId = user.id;
      },
      error: (err) => {
        console.error('Failed to fetch user:', err);
      }
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  logout(): void {
    this.authService.logout();
  }
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
  
}
