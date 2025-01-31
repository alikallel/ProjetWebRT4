// register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, MaxLengthValidator } from '@angular/forms';
import { ValidationService } from '../../shared/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.styles.css'],
})
export class RegisterComponent {
  roles = ['User', 'EventMaster'];
  genders = ['male', 'female'];

  registerForm = this.fb.group({
    username: ['', [
      ValidationService.required('Username is required'),
      ValidationService.maxLength(20,'Name cant be more that 20 char')

    ]],
    email: ['', [
      ValidationService.required('Email is required'),
      ValidationService.email('Invalid email format')
    ]],
    password: ['', [
      ValidationService.required('Password is required'),
      ValidationService.minLength(6, 'Password must be at least 6 characters')
    ]],
    role: ['User', [
      ValidationService.required('Role is required')
    ]],
    gender: ['', [
      ValidationService.required('Gender is required')
    ]],
    birthdate: ['', [
      ValidationService.required('Birthdate is required'),
      ValidationService.minAgeFromdate(5, 'Must be at least 5 years old')
    ]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, email, password, role, gender, birthdate } = this.registerForm.value;
      this.authService.register(
        email!,
        password!,
        username!,
        role!,
        gender!,
        new Date(birthdate!)
      ).subscribe({
        next: () => this.router.navigate(['/login']),
        error: () => this.snackBar.open(
          'Registration failed. Please try again later.', 
          'Close', 
          { duration: 3000 }
        ),
      });
    }
  }
}