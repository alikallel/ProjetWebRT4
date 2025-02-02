import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from 'src/app/services/auth.service';
import {RegistrationService } from 'src/app/services/registration-details.service'

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
  eventsPerPage: number = 9;
  totalPages: number = 1;
  availablePlacesMap: { [eventId: number]: number } = {};


  quantity: number = 1; // Quantité initiale
  amount: number = 0; // Montant total initialisé
  
  // L'événement sélectionné pour la modale

  selectedEvent: any = null; // Événement sélectionné

  openRegisterModal(event: any) {
    this.selectedEvent = event; // Définit l'événement sélectionné
    this.quantity = 1; // Réinitialise la quantité à 1
    this.calculateTotal(); // Calcule le montant initial
    this.registrationService.getAvailablePlaces(event.id).subscribe({
      next: (availablePlaces) => {
        this.availablePlacesMap[event.id] = availablePlaces;
      },
      error: (err) => {
        console.error('Error fetching available places', err);
        this.availablePlacesMap[event.id] = 0;
      }
    });
  
    const modalElement = document.getElementById('ticketModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show(); // Affiche le modal
    }
  }

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private router: Router,
    private authService: AuthService,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const page = +params['page'] ;
      if (isNaN(page) || page < 1) {
        // Si la page est invalide (non numérique ou inférieure à 1), redirection vers la page 1
        this.router.navigate(['/events/page', 1]);
      } else {
        // Récupère les événements pour calculer totalPages
        this.fetchEvents(page);
      }
    });
    this.fetchAvailablePlaces();
  }
  fetchAvailablePlaces(): void {
    this.events.forEach(event => {
      this.registrationService.getAvailablePlaces(event.id).subscribe({
        next: (availablePlaces) => {
          this.availablePlacesMap[event.id] = availablePlaces;
        },
        error: (err) => {
          console.error(`Error fetching available places for event ${event.id}`, err);
        }
      });
    });
  }
  
  getAvailablePlacesDisplay(eventId: number): string {
    const availablePlaces = this.availablePlacesMap[eventId];
    
    if (availablePlaces === undefined) {
      return 'Loading...';
    }
    
    return availablePlaces > 0 
      ? `${availablePlaces} places available` 
      : 'Full';
  }

  isEventMaster(): boolean {
    console.log(this.authService.getUserRole());
    return this.authService.getUserRole() === 'EventMaster';
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
    // Filtrer tous les événements
    this.filteredEvents = this.events.filter((event) =>
      event.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      event.location.toLowerCase().includes(lowerCaseSearchTerm)
    );
  
    // Réinitialiser à la première page après un filtre
    this.currentPage = 1;
    this.applyFilterAndPaginate();
  }
  

  applyFilterAndPaginate(): void {
    this.totalPages = Math.ceil(this.filteredEvents.length / this.eventsPerPage);
  
    // Vérifier si la page courante est valide
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1; // Revenir à la première page si la page actuelle n'est plus valide
    }
  
    this.paginate(); // Mettre à jour les événements paginés
  }
  

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.eventsPerPage;
    const endIndex = startIndex + this.eventsPerPage;
    this.paginatedEvents = this.filteredEvents.slice(startIndex, endIndex);  // Mise à jour des événements paginés
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginate(); // Rafraîchir la pagination avec la liste filtrée
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
  makePayment() {
    if (!this.selectedEvent) return;

    this.paymentService.createEventRegistration(this.selectedEvent.id, this.quantity)
      .subscribe({
        next: (registrationResponse) => {
          if (this.selectedEvent.price === 0) {
            const modalElement = document.getElementById('ticketModal');
            if (modalElement) {
              const modal = bootstrap.Modal.getInstance(modalElement);
              if (modal) modal.hide();
            }
            this.fetchAvailablePlaces();
            return;
          }

          this.paymentService.initiatePayment(registrationResponse.registration_id, this.amount)
            .subscribe({
              next: (paymentResponse) => {
                window.location.href = paymentResponse.payment_link;
              },
              error: (err) => {
                console.error('Payment initiation failed', err);
              }
            });
        },
        error: (err) => {
          console.error('Event registration failed', err);
        }
      });
  }

}