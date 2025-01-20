import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';  // Importer le service pour récupérer l'événement
import { Event } from '../../models/event.model';  // Votre modèle d'événement

@Component({
  selector: 'app-event-details',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
  event: Event | undefined;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService  
  ) {}

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('id');

    if (eventId) {
      this.eventService.getEventById(eventId).subscribe(
        (data) => {
          this.event = data;  // Stocker les données de l'événement
        },
        (error) => {
          console.error('Error fetching event details:', error);
        }
      );
    }
  }
}
