import { Component } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent {
  events: Event[] = [];
  searchTerm: string = '';      
  filteredEvents: Event[] = [];
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data: Event[]) => {
        this.events = data; 
        this.filteredEvents = data; 

      },
      error: (err) => {
        console.error('Erreur lors du chargement des événements :', err);
      },
    });
  }
  // Méthode de filtrage en fonction du terme de recherche
  filterEvents() {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredEvents = this.events.filter(event => 
      event.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      event.location.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
}

