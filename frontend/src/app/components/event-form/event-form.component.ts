import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationService } from '../shared/validation.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent {
  eventForm: FormGroup;
  alertMessage: string | null = null;
  minDate: string = new Date().toISOString().split('T')[0]; 
  selectedFile: File | null = null; // To store the selected file

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z0-9\\s]+$')]],
      date: ['', [Validators.required, ValidationService.eventDateValidator()]],
      location: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['0', [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      capacity: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[1-9]\d*$/)]],
    });
  }


  getTitleErrorMessage(): string {
    const control = this.eventForm.get('title');
    if (control?.errors) {
      if (control.errors['required']) return 'Title is required.';
      if (control.errors['minlength']) return 'Title must be at least 3 characters long.';
      if (control.errors['pattern']) return 'Title must only contain letters, numbers, and spaces.';
    }
    return '';
  }

  getDateErrorMessage(): string {
    const control = this.eventForm.get('date');
    if (control?.errors) {
      if (control.errors['required']) return 'Date is required.';
      if (control.errors['invalidDate']) return 'Date cannot be in the past.';
    }
    return '';
  }

  getLocationErrorMessage(): string {
    const control = this.eventForm.get('location');
    if (control?.errors) {
      if (control.errors['required']) return 'Location is required.';
      if (control.errors['minlength']) return 'Location must be at least 2 characters long.';
    }
    return '';
  }

  getDescriptionErrorMessage(): string {
    const control = this.eventForm.get('description');
    if (control?.errors) {
      if (control.errors['required']) return 'Description is required.';
      if (control.errors['minlength']) return 'Description must be at least 10 characters long.';
    }
    return '';
  }

  getPriceErrorMessage(): string {
    const control = this.eventForm.get('price');
    if (control?.errors) {
      if (control.errors['required']) return 'Price is required.';
      if (control.errors['min']) return 'Price must be positive.';
    }
    return '';
  }

  getCapacityErrorMessage(): string {
    const control = this.eventForm.get('capacity');
    if (control?.errors) {
      if (control.errors['required']) return 'Capacity is required.';
      if (control.errors['min']) return 'Capacity must be greater than 0.';
    }
    return '';
  }
  // Handle file selection
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  /*onSubmit() {
    if (this.eventForm.valid) {
      const eventData = { ...this.eventForm.value,
        price: parseFloat(this.eventForm.value.price), 
        capacity: parseInt(this.eventForm.value.capacity, 10) 
       };
      this.eventService.addEvent(eventData).subscribe(
        (response) => {
          console.log('Event added successfully:', response);
          this.snackBar.open('Event added successfully.', 'Close', { duration: 3000 });
          this.eventForm.reset();
        },
        (error) => {
          console.error('Error adding event:', error);
          this.snackBar.open('Error adding event.', 'Close', { duration: 3000 });
        }
      );
    } else {
      console.log('Form is invalid');
      this.snackBar.open('Form is invalid.', 'Close', { duration: 3000 });
    }
  }*/
    onSubmit() {
      if (this.eventForm.valid) {
        const formData = new FormData();
        formData.append('title', this.eventForm.get('title')?.value);
        formData.append('date', this.eventForm.get('date')?.value);
        formData.append('location', this.eventForm.get('location')?.value);
        formData.append('description', this.eventForm.get('description')?.value);
        formData.append('price', this.eventForm.get('price')?.value);
        formData.append('capacity', this.eventForm.get('capacity')?.value);
    
        // If a file is selected, append it to the FormData
        if (this.selectedFile) {
          formData.append('image', this.selectedFile, this.selectedFile.name);
        }
        console.log('Form data:', formData);
        this.eventService.addEvent(formData).subscribe(
          (response) => {
            console.log('Event added successfully:', response);
            this.snackBar.open('Event added successfully.', 'Close', { duration: 3000 });
            this.router.navigate(['/events']);
          },
          (error) => {
            console.error('Error adding event:', error);
            this.snackBar.open('Error adding event.', 'Close', { duration: 3000 });
          }
        );
      } else {
        console.log('Form is invalid');
        this.snackBar.open('Form is invalid.', 'Close', { duration: 3000 });
      }
    }
    
}