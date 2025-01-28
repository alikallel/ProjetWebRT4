import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.styles.css'],
})
export class RegisterComponent {
  email = '';
  password = '';
  username = '';
  role = 'User';

  roles = ['User', 'EventMaster'];

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  register() {
    this.authService.register(this.email, this.password, this.username, this.role).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.snackBar.open('Registration failed. Please try again later.', 'Close', { duration: 3000 }),
    });
  }
}
