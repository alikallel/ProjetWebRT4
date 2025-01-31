import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration-details.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
  eventId: string = '';
  eventData: any = null;
  organizerEvents: Event[] = [];
  loading: boolean = true;
  errorMessage: string = '';
  availablePlaces?: number;


  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private regestrationService: RegistrationService
  ) {}

ngOnInit(): void {
    // Listen to changes in route parameters
    this.route.paramMap.subscribe((params) => {
      this.eventId = params.get('id') || '';
      if (this.eventId) {
        this.loadEventData(this.eventId);
        this.loadAvailablePlaces(this.eventId);
      }
    });
  }
  loadEventData(id: string): void {
    this.loading = true;
    this.eventService.getEventById(id).subscribe(
      (data) => {
        this.eventData = data;
        console.log('Event Data:', this.eventData);

        if (this.eventData?.organizer?.id) {
          this.loadOrganizerEvents(this.eventData.organizer.id);
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching event details:', error);
        this.errorMessage = 'Error fetching event details. Please try again later.';
        this.loading = false;
      }
    );
  }

  loadOrganizerEvents(organizerId: number): void {
    this.eventService.getEventsByOrganizerId(organizerId).subscribe(
      (data) => {
        this.organizerEvents = data;
        console.log('Organizer Events:', this.organizerEvents);
      },
      (error) => {
        console.error('Error fetching organizer events:', error);
        this.errorMessage = 'Error fetching organizer events. Please try again later.';
      }
    );
  }
  loadAvailablePlaces(eventId: string): void {
    this.regestrationService.getAvailablePlaces(+eventId).subscribe({
      next: (places) => {
        this.availablePlaces = places;
      },
      error: (error) => {
        console.error('Error fetching available places:', error);
      }
    });
  }
}
