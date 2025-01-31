import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';

interface Event {
  id: number;
  title: string;
  capacity: number;
  description?: string;
  date?: string;
}

interface Booking {
  user: { email: string };
  number_of_places: number;
  status: string;
}

@Component({
  selector: 'app-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.css']
})
export class RegistrationDetailsComponent implements OnInit {
  event: Event | null = null;
  bookings: Booking[] = [];
  bookedPlaces = 0;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private registrationService: RegistrationService,
    private eventService: EventService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : NaN;

    if (isNaN(id)) {
      this.error = 'Invalid registration ID.';
      this.isLoading = false;
      return;
    }

    this.fetchEventDetails(id);
  }

  private fetchEventDetails(id: number): void {
    this.eventService.getEventById(id.toString()).subscribe({
      next: (details) => {
        this.event = details;
        this.fetchBookings(id);
      },
      error: (err) => {
        this.error = `Error fetching event details: ${err.message}`;
        this.isLoading = false;
      }
    });
  }

  private fetchBookings(id: number): void {
    this.registrationService.getEventBookings(id).subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.bookedPlaces = bookings.reduce((total, booking) => total + booking.number_of_places, 0);
      },
      error: (err) => {
        this.error = `Error fetching bookings: ${err.message}`;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  navigateToChecklist(eventId: number): void {
    this.router.navigate(['/checklist', eventId]);
  }
}