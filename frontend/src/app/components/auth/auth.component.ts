import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  email = '';
  password = '';
  isRegister = true;

  constructor(private authService: AuthService) {}

}
