// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { ValidationService } from '../../shared/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.styles.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [
      ValidationService.required('Email is required'),
      ValidationService.email('Invalid email format')
    ]],
    password: ['', [
      ValidationService.required('Password is required'),
      ValidationService.minLength(6, 'Password must be at least 6 characters')
    ]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    console.log('Form submission triggered');
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email!, password!).subscribe({
        next: () => this.router.navigate(['/']),
        error: () => this.snackBar.open(
          'Login failed. Please check your credentials.', 
          'Close', 
          { duration: 3000 }
        ),
      });
    }
  }
}