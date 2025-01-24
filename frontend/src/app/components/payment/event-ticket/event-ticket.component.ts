import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-ticket',
  templateUrl: './event-ticket.component.html',
  styleUrls: ['./event-ticket.component.css'],
})
export class EventTicketComponent implements OnInit {
  @Input() eventDetails: any;

  constructor() {}

  ngOnInit(): void {}

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  }
}
