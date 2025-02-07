import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalService } from '../../services/modal.service';
import { PaymentService } from '../../services/payment.service';
import { EventStateService } from '../../services/event-state.service';
import { RegistrationService } from 'src/app/services/registration-details.service';

declare var bootstrap: any;

@Component({
  selector: 'app-event-registration-modal',
  templateUrl: './event-registration-modal.component.html',
  styleUrls: ['./event-registration-modal.component.css']
})
export class EventRegistrationModalComponent implements OnInit, OnDestroy {
  selectedEvent: any = null;
  quantity: number = 1;
  amount: number = 0;
  private modalInstance: any;
  private destroy$ = new Subject<void>();

  constructor(
    private modalService: ModalService,
    private paymentService: PaymentService,
    private registrationService: RegistrationService,
    private eventStateService: EventStateService
  ) {}

  ngOnInit(): void {
    const modalElement = document.getElementById('eventRegistrationModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      
      this.modalService.currentEvent
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          if (event) {
            this.selectedEvent = event;
            this.resetForm();
            this.modalInstance?.show();
            this.updateAvailablePlaces();
          }
        });

      modalElement.addEventListener('hidden.bs.modal', () => {
        this.modalService.closeModal();
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.modalInstance) {
      this.modalInstance.dispose();
    }
  }

  private resetForm(): void {
    this.quantity = 1;
    this.calculateTotal();
  }

  private updateAvailablePlaces(): void {
    if (this.selectedEvent) {
      this.registrationService.getAvailablePlaces(this.selectedEvent.id).subscribe({
        next: (places) => {
          this.eventStateService.updateAvailablePlaces(this.selectedEvent.id, places);
        },
        error: (err) => {
          console.error('Error fetching available places:', err);
        }
      });
    }
  }

  calculateTotal(): void {
    if (this.selectedEvent) {
      this.amount = this.quantity * this.selectedEvent.price;
    }
  }

  incrementQuantity(): void {
    if (this.canIncrementQuantity()) {
      this.quantity++;
      this.calculateTotal();
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.calculateTotal();
    }
  }

  canIncrementQuantity(): boolean {
    const availablePlaces = this.eventStateService.getAvailablePlaces(this.selectedEvent?.id);
    return availablePlaces ? this.quantity < availablePlaces : false;
  }

  isValidPurchase(): boolean {
    const availablePlaces = this.eventStateService.getAvailablePlaces(this.selectedEvent?.id);
    return availablePlaces ? this.quantity <= availablePlaces : false;
  }

  getAvailablePlacesDisplay(): string {
    if (!this.selectedEvent) return 'Loading...';
    
    const availablePlaces = this.eventStateService.getAvailablePlaces(this.selectedEvent.id);
    
    if (availablePlaces === undefined) {
      return 'Loading...';
    }
    
    return availablePlaces > 0 
      ? `${availablePlaces} places available` 
      : 'Full';
  }

  makePayment(): void {
    if (!this.selectedEvent) return;

    this.paymentService.createEventRegistration(this.selectedEvent.id, this.quantity)
      .subscribe({
        next: (registrationResponse) => {
          if (this.selectedEvent.price === 0) {
            this.modalInstance?.hide();
            this.updateAvailablePlaces();
            return;
          }

          this.paymentService.initiatePayment(registrationResponse.registration_id, this.amount)
            .subscribe({
              next: (paymentResponse) => {
                window.location.href = paymentResponse.payment_link;
              },
              error: (err) => {
                console.error('Payment initiation failed', err);
                alert('Payment failed. Please try again.');
              }
            });
        },
        error: (err) => {
          console.error('Event registration failed', err);
          alert('Registration failed. Please try again.');
        }
      });
  }
}
