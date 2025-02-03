import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userForm: FormGroup;
  user: User | undefined;
  userId = 3;

  constructor(private fb: FormBuilder, private userService: AuthService) {
    this.userForm = this.fb.group({
      email: [''],
      role: [''],
      username: [''],
      password: [''],
      photo: [''] 
    });    
  }

 ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe((user: User) => {
      this.user = user;
      this.userForm.patchValue({
        email: user.email,
        role: user.role,
        photo: user.photo,
        username: user.username
      });
    });
  }

   /* ngOnInit(): void {
      // ✅ Charger l'utilisateur connecté au démarrage
      this.userService.getCurrentUser().subscribe({
        next: (user: User) => {
          this.user = user;
          this.userForm.patchValue({
            email: user.email,
            role: user.role,
            photo: user.photo,
            username: user.username
          });
        },
        error: (err) => {
          console.error('Failed to load user', err);
        }
      });
    }
*/
  onSubmit() {
    if (!this.user) return;
    const updatedData = {
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      photo: this.userForm.value.photo,
      username: this.userForm.value.username
    };

    this.userService.updateUser(this.user.id, updatedData).subscribe(() => {
      alert('Profile updated successfully!');
    });
  }
}
