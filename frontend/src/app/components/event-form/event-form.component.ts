import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent {
  eventForm: FormGroup; 
  alertMessage: string | null = null; 
  minDate: string = new Date().toISOString().split('T')[0]; // Date actuelle

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
     private snackBar: MatSnackBar
  ) {
    // Initialisation du formulaire avec des validations
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z0-9\\s]+$')]],
      date: ['', [Validators.required, this.dateValidator.bind(this)]],
      location: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [
        '',
        [Validators.required, Validators.min(1), Validators.minLength(1)],
      ],
      capacity: [
        '',
        [Validators.required, Validators.min(1),Validators.minLength(1)],
      ],
    });

    
  }
  // Validateur personnalisé pour la date
  private dateValidator(control: any): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    const today = new Date(this.minDate);

    if (selectedDate < today) {
      return { invalidDate: 'The date cannot be in the past.' };
    }
    return null;
  }

  // Méthode de soumission
  onSubmit() {
    if (this.eventForm.valid) {
      const eventData = { ...this.eventForm.value };
      this.eventService.addEvent(eventData).subscribe(
        (response) => {
          console.log('Event added successfully:', response);
          this.snackBar.open('Event added successfully.', 'Close', { duration: 3000 })
          this.eventForm.reset(); 
        },
        (error) => {
          console.error('Error adding event:', error);
          this.snackBar.open('Error adding event.', 'Close', { duration: 3000 })

        }
      );
    } else {
      console.log('Form is invalid');
      this.snackBar.open('Form is invalid.', 'Close', { duration: 3000 })

    }
  }
}
