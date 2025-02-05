import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { AuthService } from 'src/app/services/auth.service';
import { EventRegistrationModalComponent } from '../event-registration-modal/event-registration-modal.component';


declare  var bootstrap: any;
@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent implements OnInit {
  myEvents: Event[] = [];
  isLoading = true;
  filteredEvents: Event[] = [];
  searchTerm: string = '';
  error: string | null = null;

  constructor(
    private eventService: EventService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.fetchMyEvents();
  }

  private fetchMyEvents(): void {
    this.eventService.getMyEvents().subscribe({
      next: (events) => {
        this.myEvents = events;
        this.filteredEvents = events;
        
        if (events.length === 0) {
          this.error = 'You have no events yet. Create your first event!';
        }
      },
      error: (err) => {
        this.error = 'Unable to fetch events. Please try again later.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  filterEvents(): void {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredEvents = this.myEvents.filter((event) =>
      event.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      event.location.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
  getUpcomingEventsCount(): number {
    const now = new Date();
    return this.myEvents.filter(event => new Date(event.date) > now).length;
  }

  getPastEventsCount(): number {
    const now = new Date();
    return this.myEvents.filter(event => new Date(event.date) <= now).length;
  }

  

  navigateToEventDetails(eventId: number): void {
    this.router.navigate([`/event-details/${eventId}`]);
  }

  navigateToRegistrationDetails(eventId: number): void {
    this.router.navigate([`/registration-details/${eventId}`]);
  }

  isEventMaster(): boolean {
    return this.authService.getUserRole() === 'EventMaster';
  }
  openGetPaidModal() {
    const modalElement = document.getElementById('getPaidModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openRegisterModal(event: any): void {
    const modalElement = document.getElementById('eventRegistrationModal');
    if (modalElement) {
      const openModalEvent = new CustomEvent('open-registration-modal', { 
        detail: { event: event } 
      });
      modalElement.dispatchEvent(openModalEvent);
    }
  }

  onRegistrationComplete() {
    this.fetchMyEvents();
  }
}