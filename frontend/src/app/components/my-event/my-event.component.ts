import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent {
  myEvents: Event[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private eventService: EventService, private router: Router,    private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchMyEvents();
  }

  private fetchMyEvents(): void {
    this.eventService.getMyEvents().subscribe({
      next: (events) => {
        this.myEvents = events;
      },
      error: (err) => {
        this.error = `Error fetching my events: ${err.message}`;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  navigateToEventDetails(eventId: number): void {
    this.router.navigate([`/event-details/${eventId}`]);
  }

  navigateToRegistrationDetails(eventId: number): void {
    this.router.navigate([`/registration-details/${eventId}`]);
  }

  navigateToAddEvent(): void {
    this.router.navigate(['/add-event']);
  }
  isEventMaster(): boolean {
    console.log(this.authService.getUserRole());
    return this.authService.getUserRole() === 'EventMaster';
  }
}
