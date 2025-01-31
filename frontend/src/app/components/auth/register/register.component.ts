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
  gender = 'male';
  birthdate: Date = new Date();

  roles = ['User', 'EventMaster'];
  genders = ['male', 'female'];

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  register() {
    this.authService.register(this.email, this.password, this.username, this.role, this.gender, this.birthdate).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        const errorMessage = err.error?.message || 'Registration failed. Please try again.';
        this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
      },
    });
  }

}
