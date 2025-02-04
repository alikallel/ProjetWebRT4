import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as bcrypt from 'bcryptjs';
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
  selectedFile: File | null = null;
  previewImage: string | null = null;

  constructor(private fb: FormBuilder, private userService: AuthService) {
    this.userForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      role: [''],
      username: ['',[Validators.required, Validators.minLength(3)]],
      password: ['',[Validators.minLength(6)]]
    });    
  }

/* ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe((user: User) => {
      this.user = user;
      this.userForm.patchValue({
        email: user.email,
        role: user.role,
        photo: user.photo,
        username: user.username
      });
    });
  }*/

   ngOnInit(): void {
      this.userService.getCurrentUser().subscribe({
        next: (user: User) => {
          this.user = user;
          this.userForm.patchValue({
            email: user.email,
            role: user.role,
            username: user.username
          });
        },
        error: (err) => {
          console.error('Failed to load user', err);
        }
      });
    }
    onFileSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = () => this.previewImage = reader.result as string;
        reader.readAsDataURL(file);
      }
    }
  
    async onSubmit() {
      if (!this.user) return;
      const updatedData: Partial<User> = {
        email: this.userForm.value.email,
        username: this.userForm.value.username
      };
      if (this.userForm.value.password) {
        updatedData.password = this.userForm.value.password;
      if (this.userForm.value.password) {
        const hashedPassword = await bcrypt.hash(this.userForm.value.password, 10);
        updatedData.password = hashedPassword;
      }
      }
  
      this.userService.updateUser(updatedData).subscribe(() => {
        alert('Profile updated successfully!');
      });
  
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        this.userService.uploadProfileImage(formData).subscribe({
          next: (response: any) => {
            alert('Profile image updated successfully!');
    
            // ✅ Correction : Vérifier si response contient l'utilisateur mis à jour
            if (response && response.photo) {
              this.user!.photo = response.photo;
              this.previewImage = 'http://localhost:3000' + response.photo;
            }
          },
          error: (err) => {
            console.error('Image upload failed', err);
          }
        });
      }
    }
}
