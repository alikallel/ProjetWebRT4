import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { AuthService } from 'src/app/services/auth.service';

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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchMyEvents();
  }

  private fetchMyEvents(): void {
    this.eventService.getMyEvents().subscribe({
      next: (events) => {
        this.myEvents = events;
        this.filteredEvents = events;
      },
      error: (err) => {
        this.error = `Error fetching my events: ${err.message}`;
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
}