import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration-details.service';
import { faEdit, faUpload, faStar } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { EventSponsorshipService } from '../../services/event-sponsorship.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
  eventId: string = '';
  eventData: any = null;
  organizerEvents: Event[] = [];
  loading: boolean = true;
  errorMessage: string = '';
  availablePlaces?: number;
  editMode: boolean = false;
  faEdit = faEdit;
  faStar = faStar;
  originalEventData: any = null;
  registeredAttendees: number = 0;
  private originalAvailablePlaces?: number;
  faUpload = faUpload;
  selectedFile: File | null = null;
  isOrganizer: boolean = false;
  sponsorshipDetails: any = null;
  showSponsorshipModal: boolean = false;
  isEventMasterUser: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private regestrationService: RegistrationService,
    private authService: AuthService,
    private modalService: ModalService,
    private sponsorshipService: EventSponsorshipService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.eventId = params.get('id') || '';
      if (this.eventId) {
        this.loadEventData(this.eventId);
        this.loadAvailablePlaces(this.eventId);
        this.loadSponsorshipDetails();
        this.checkUserRole();
      }
    });
  }

  private checkUserRole(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.isEventMasterUser = user.role === 'EVENTMASTER';
    });
  }

  private loadSponsorshipDetails(): void {
    this.sponsorshipService.findByEvent(Number(this.eventId)).subscribe({
      next: (details) => {
        this.sponsorshipDetails = details;
      },
      error: (error) => {
        console.error('Error loading sponsorship details:', error);
      }
    });
  }

  openSponsorshipModal(): void {
    this.showSponsorshipModal = true;
  }

  closeSponsorshipModal(): void {
    this.showSponsorshipModal = false;
  }

  initiateSponsorship(): void {
    if (!this.isEventMaster()) {
      alert('Only Event Masters can sponsor events');
      return;
    }

    const sponsorshipDto = {
      event_id: Number(this.eventId)
    };

    this.sponsorshipService.create(sponsorshipDto).subscribe({
      next: (response) => {
        window.location.href = response.payment_details.payment_link;
      },
      error: (error) => {
        if (error.status === 400) {
          alert('This event is already sponsored');
        } else {
          alert('Failed to initiate sponsorship. Please try again.');
        }
      }
    });
  }
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      this.uploadImage();
    }
  }
  uploadImage(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.eventService.updateEventImage(this.eventId, formData).subscribe({
      next: (updatedEvent) => {
        this.eventData = updatedEvent;
        this.selectedFile = null;
        alert('Image updated successfully!');
      },
      error: (error) => {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
    });
  }

  triggerFileInput(): void {
    document.getElementById('imageUpload')?.click();
  }
  onCapacityChange(event: any): void {
    const newAvailablePlaces = parseInt(event.target.value);
    if (newAvailablePlaces < 0) {
      alert('Available places cannot be negative');
      this.availablePlaces = this.originalAvailablePlaces;
      return;
    }
    this.availablePlaces = newAvailablePlaces;
  }

  toggleEditMode(): void {
    if (this.editMode) {
      this.eventData = { ...this.originalEventData };
      this.availablePlaces = this.originalAvailablePlaces;
    } else {
      this.originalEventData = { ...this.eventData };
      this.originalAvailablePlaces = this.availablePlaces;
    }
    this.editMode = !this.editMode;
  }

  isEventMaster(): boolean {
    return this.authService.getUserRole() === 'EventMaster';
  }

  loadEventData(id: string): void {
    this.loading = true;
    this.eventService.getEventById(id).subscribe(
      (data) => {
        this.eventData = data;
        if (this.eventData?.organizer?.id) {
          this.authService.getCurrentUser().subscribe(
            (currentUser) => {
              this.isOrganizer = currentUser.id === this.eventData.organizer.id;
              this.loadOrganizerEvents(this.eventData.organizer.id);
            },
            (error) => {
              console.error('Error fetching current user:', error);
              this.errorMessage = 'Error fetching current user. Please try again later.';
            }
          );
        }
        this.loading = false;
      },
      (error) => {
        this.errorMessage = `Error fetching event details. Please try again later. ${error}`;
        this.loading = false;
      }
    );
  }
  updateEvent(): void {
      console.log('registeredAttendees (static):', this.registeredAttendees);
      const payload: Partial<Event> = {};
      if (this.eventData.description !== this.originalEventData.description) {
        payload.description = this.eventData.description;
      }
      if (this.availablePlaces === undefined || this.availablePlaces < 0) {
        alert('Available places must be a non-negative number.');
        return;
      }
      const newCapacity = this.registeredAttendees + this.availablePlaces!;
      console.log('newCapacity:', newCapacity);
      if (newCapacity >= this.registeredAttendees) {
        payload.capacity = newCapacity;
      } else {
        alert('New capacity must be greater than or equal to the number of registered attendees.');
        return;
      }
      this.eventService.patchEvent(this.eventId, payload).subscribe(
        (updatedEvent) => {
          this.eventData = { ...this.eventData, ...updatedEvent };
          this.availablePlaces = updatedEvent.capacity - this.registeredAttendees;
          this.originalEventData = { ...updatedEvent };
          this.editMode = false;
          alert('Event updated successfully!');
        },
        (error) => {
          console.error('Update failed:', error);
          alert('Failed to update event. Please try again.');
        }
      );
    }
  loadOrganizerEvents(organizerId: number): void {
    this.eventService.getEventsByOrganizerId(organizerId).subscribe(
      (data) => {
        this.organizerEvents = data;
      },
      (error) => {
        this.errorMessage = `Error fetching organizer events. Please try again later. ${error}`;
      }
    );
  }

  loadAvailablePlaces(eventId: string): void {
    this.regestrationService.getAvailablePlaces(+eventId).subscribe({
      next: (places) => {
        this.availablePlaces = places;
      },
      error: (error) => {
        console.error('Error fetching available places:', error);
      }
    });
  }
  openRegisterModal(event: any) {
    this.modalService.openModal(event);
  }

  
}
