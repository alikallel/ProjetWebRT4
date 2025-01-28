import { Component, OnInit } from '@angular/core';
import { PaymentService, UserPayment } from 'src/app/services/payment.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  payments: UserPayment[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    const userId = 1; //waiting for mohamed karrab 
    this.fetchPayments(userId);
  }

  fetchPayments(userId: number): void {
    this.paymentService.getUserPayments(userId).subscribe({
      next: (payments) => {
        this.payments = payments;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load payment history';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'COMPLETED': return 'badge bg-success';
      case 'PENDING': return 'badge bg-warning';
      case 'FAILED': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }
  
}