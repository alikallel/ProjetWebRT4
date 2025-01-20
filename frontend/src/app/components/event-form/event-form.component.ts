import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent {
  alertMessage: string | null = null; 
  minDate: string = new Date().toISOString().split('T')[0]; // Date actuelle
 
  constructor(private eventService: EventService, private router: Router, private alertService: AlertService) 
  {
    this.alertService.alert$.subscribe((message) => {
      this.alertMessage = message;  
      setTimeout(() => {
        this.alertMessage = null;  
      }, 3000);
    });
  }

  onSubmit(eventForm: NgForm) {
    if (eventForm.valid) {
      const eventData = { 
        ...eventForm.value, 
        organizer: 1
      };
      

      this.eventService.addEvent(eventData).subscribe(
        (response) => {
          console.log('Event added successfully:', response);
          this.alertService.showAlert('Event added successfully!'); 
          eventForm.resetForm();
        },
        (error: any) => {
          console.error('Error adding event:', error);
          this.alertService.showAlert('Error adding event! Please try again.'); 
          eventForm.resetForm();
        }
      );
    } else {
      console.log('Form is invalid');
      this.alertService.showAlert('Please fill out the form correctly.');  
    }
  }
}

