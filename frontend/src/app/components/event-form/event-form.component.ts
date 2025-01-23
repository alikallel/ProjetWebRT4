import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { EventService } from 'src/app/services/event.service';

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
    private alertService: AlertService
  ) {
    // Initialisation du formulaire avec des validations
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z0-9\\s]+$')]],
      date: ['', [Validators.required]],
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

    // Abonnement aux alertes
    this.alertService.alert$.subscribe((message) => {
      this.alertMessage = message;
      setTimeout(() => (this.alertMessage = null), 3000);
    });
  }

  // Méthode de soumission
  onSubmit() {
    if (this.eventForm.valid) {
      const eventData = { ...this.eventForm.value, organizer: 1, };
      this.eventService.addEvent(eventData).subscribe(
        (response) => {
          console.log('Event added successfully:', response);
          this.alertService.showAlert('Event added successfully!');
          this.eventForm.reset(); 
        },
        (error) => {
          console.error('Error adding event:', error);
          this.alertService.showAlert('Error adding event! Please try again.');
        }
      );
    } else {
      console.log('Form is invalid');
      this.alertService.showAlert('Please fill out the form correctly.');
    }
  }
}
