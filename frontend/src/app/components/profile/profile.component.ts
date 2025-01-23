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
  userId = 1;

  constructor(private fb: FormBuilder, private userService: AuthService) {
    this.userForm = this.fb.group({
      email: [''],
      role: [''],
      password: [''],
      photo: [''] // URL optionnelle
    });    
  }

  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe((user: User) => {
      this.user = user;
      this.userForm.patchValue({
        email: user.email,
        role: user.role,
        photo: user.photo
      });
    });
  }

 

  onSubmit() {
    const updatedData = {
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      photo: this.userForm.value.photo
    };

    this.userService.updateUser(this.userId, updatedData).subscribe(() => {
      alert('Profile updated successfully!');
    });
  }
}
