// event-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RegistrationService } from 'src/app/services/registration-details.service';
import { ModalService } from 'src/app/services/modal.service';

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
  availablePlacesMap: { [eventId: number]: number } = {};

  dateFilter: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  currentPage: number = 1;
  eventsPerPage: number = 9;
  totalPages: number = 1;
  showAdvancedFilters: boolean = false;


  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private registrationService: RegistrationService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const page = +params['page'];
      if (isNaN(page) || page < 1) {
        this.router.navigate(['/events/page', 1]);
      } else {
        this.fetchEvents(page);
      }
    });
  }

  fetchEvents(page: number): void {
    this.eventService.getEvents().subscribe({
      next: (data: Event[]) => {
        this.events = data;
        this.applyFilters();
        this.totalPages = Math.ceil(this.filteredEvents.length / this.eventsPerPage);

        if (page < 1 || page > this.totalPages) {
          this.router.navigate(['/events/page', 1]);
        } else {
          this.currentPage = page;
          this.paginate();
          this.fetchAvailablePlaces();
        }
      },
      error: (err) => {
        console.error('Error loading events:', err);
      },
    });
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

  openRegisterModal(event: any) {
    this.modalService.openModal(event);
  }

  applyFilters(): void {
    this.filteredEvents = this.events.filter((event) => {
      const matchesSearch = !this.searchTerm || 
        event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesDate = !this.dateFilter || 
        new Date(event.date).toISOString().split('T')[0] === this.dateFilter;

      const matchesPrice = (!this.minPrice || event.price >= this.minPrice) &&
        (!this.maxPrice || event.price <= this.maxPrice);

      return matchesSearch && matchesDate && matchesPrice;
    });

    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredEvents.length / this.eventsPerPage);
    this.paginate();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.dateFilter = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.applyFilters();
  }
  get hasActiveFilters(): boolean {
    return !!(
      this.searchTerm ||
      this.dateFilter ||
      this.minPrice ||
      this.maxPrice
    );
  }
  get hasAdvancedFiltersActive(): boolean {
    return !!(
      this.dateFilter ||
      this.minPrice ||
      this.maxPrice
    );
  }

  toggleAdvancedFilters(): void {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.eventsPerPage;
    const endIndex = startIndex + this.eventsPerPage;
    this.paginatedEvents = this.filteredEvents.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginate();
    }
  }

  isEventMaster(): boolean {
    return this.authService.getUserRole() === 'EventMaster';
  }

  onRegistrationComplete(): void {
    this.fetchAvailablePlaces();
  }
}