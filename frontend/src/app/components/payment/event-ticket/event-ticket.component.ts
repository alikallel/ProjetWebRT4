import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-ticket',
  templateUrl: './event-ticket.component.html',
  styleUrls: ['./event-ticket.component.css'],
})
export class EventTicketComponent implements OnInit {
  @Input() eventDetails: any;
  ticketReference: string = '';

  constructor() {}
  qrCodeData!: string;

  ngOnInit(): void {
    this.qrCodeData = JSON.stringify({
      registrationId: this.eventDetails.id,
      eventTitle: this.eventDetails.event.title,
      paymentId: this.eventDetails.payment_id,
      email: this.eventDetails.user.email,
      numberOfPlaces: this.eventDetails.number_of_places
    });
    this.generateTicketReference();

  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  }
  calculateExpirationDate(): Date {
    const eventDate = new Date(this.eventDetails.event.date);
    return new Date(eventDate.setHours(eventDate.getHours() + 1));
  }
  generateTicketReference(): void {
    this.ticketReference = `EP-${this.eventDetails.id.toString().padStart(6, '0')}`;
  }
}
