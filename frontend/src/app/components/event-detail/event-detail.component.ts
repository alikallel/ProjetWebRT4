import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
  eventId: string = '';
  eventData: any = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'événement depuis l'URL
    this.eventId = this.route.snapshot.paramMap.get('id') || '';
    
    if (this.eventId) {
      this.loadEventData(this.eventId);
    }
  }

  loadEventData(id: string): void {
    this.eventService.getEventById(id).subscribe(
      (data) => {
        this.eventData = data;
        console.log('Event Data:', this.eventData);
      },
      (error) => {
        console.error('Error fetching event details:', error);
      }
    );
  }
}
