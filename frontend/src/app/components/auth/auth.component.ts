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

  submit() {
    if (this.isRegister) {
      this.authService.register(this.email, this.password).subscribe();
    } else {
      this.authService.login(this.email, this.password).subscribe();
    }
  }
}
