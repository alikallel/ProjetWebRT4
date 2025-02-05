import { Component, OnInit } from '@angular/core';
import { PaymentService, UserPayment } from 'src/app/services/payment.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  payments: UserPayment[] = [];
  filteredPayments: UserPayment[] = [];
  isLoading = true;
  error: string | null = null;
  searchTerm = '';
  
  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.fetchPayments();
  }

  fetchPayments(): void {
    this.paymentService.getUserPayments().subscribe({
      next: (payments) => {
        this.payments = payments;
        this.filteredPayments = payments;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load payment history';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  filterPayments(): void {
    const searchText = this.searchTerm.toLowerCase().trim();
    if (!searchText) {
      this.filteredPayments = this.payments;
    } else {
      this.filteredPayments = this.payments.filter(payment => 
        payment.registration.event.title.toLowerCase().includes(searchText)
      );
    }
  }

  getStatusClass(status: string): string {
    switch(status.toUpperCase()) {
      case 'COMPLETED': return 'badge rounded-pill bg-success';
      case 'PENDING': return 'badge rounded-pill bg-warning text-dark';
      case 'FAILED': return 'badge rounded-pill bg-danger';
      default: return 'badge rounded-pill bg-secondary';
    }
  }

  getStatusIcon(status: string): string {
    switch(status.toUpperCase()) {
      case 'COMPLETED': return 'bi bi-check-circle-fill';
      case 'PENDING': return 'bi bi-clock-fill';
      case 'FAILED': return 'bi bi-x-circle-fill';
      default: return 'bi bi-question-circle-fill';
    }
  }
}