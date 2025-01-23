import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
declare  var bootstrap: any;
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  paginatedEvents: Event[] = [];
  searchTerm: string = '';

  // Pagination variables
  currentPage: number = 1;
  eventsPerPage: number = 12;
  totalPages: number = 1;


  quantity: number = 1; // Quantité initiale
  amount: number = 0; // Montant total initialisé
  
  // L'événement sélectionné pour la modale

  selectedEvent: any = null; // Événement sélectionné

  openRegisterModal(event: any) {
    this.selectedEvent = event; // Définit l'événement sélectionné
    this.quantity = 1; // Réinitialise la quantité à 1
    this.calculateTotal(); // Calcule le montant initial
    const modalElement = document.getElementById('ticketModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show(); // Affiche le modal
    }
  }

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const page = +params['page'] ;
      // Récupère les événements en premier pour calculer totalPages
      this.fetchEvents(page);
    });
  }

  fetchEvents(page: number): void {
    this.eventService.getEvents().subscribe({
      next: (data: Event[]) => {
        this.events = data;
        this.filteredEvents = data;  // Initialisation de filteredEvents avec tous les événements
        this.totalPages = Math.ceil(this.events.length / this.eventsPerPage);

        // Vérification de la page demandée après le calcul des totalPages
        if (page < 1 || page > this.totalPages) {
          this.router.navigate(['/events/page', 1]);  // Redirection vers la page 1 si la page demandée est invalide
        } else {
          this.currentPage = page;
          this.applyFilterAndPaginate();  // Appliquer le filtre et la pagination
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des événements :', err);
      },
    });
  }

  filterEvents(): void {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    // Filtrer tous les événements, pas seulement ceux de la page actuelle
    this.filteredEvents = this.events.filter((event) =>
      event.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      event.location.toLowerCase().includes(lowerCaseSearchTerm)
    );
    this.applyFilterAndPaginate();  // Appliquer la pagination après le filtrage
  }

  applyFilterAndPaginate(): void {
    this.totalPages = Math.ceil(this.filteredEvents.length / this.eventsPerPage);

    // Si la page actuelle devient invalide après le filtrage, rediriger vers la première page
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
      this.router.navigate(['/events/page', 1]);  // Redirection vers la première page
    }

    this.paginate();  // Mise à jour des événements paginés
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.eventsPerPage;
    const endIndex = startIndex + this.eventsPerPage;
    this.paginatedEvents = this.filteredEvents.slice(startIndex, endIndex);  // Mise à jour des événements paginés
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.router.navigate(['/events/page', page]);  
    }
  }
  

  incrementQuantity() {
    this.quantity++;
    this.calculateTotal(); // Met à jour le montant total
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.calculateTotal(); // Met à jour le montant total
    }
  }

  calculateTotal() {
    if (this.selectedEvent) {
      this.amount = this.quantity * this.selectedEvent.price;
    }
  }

  
}
