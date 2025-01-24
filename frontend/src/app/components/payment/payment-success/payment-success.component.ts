import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentVerificationService } from '../../../services/payment.verif.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  paymentVerified = false;
  eventDetails: any = null;

  constructor(
    private route: ActivatedRoute,
    private paymentVerificationService: PaymentVerificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const paymentId = params['payment_id'];
      if (paymentId) {
        this.verifyPayment(paymentId);
      }
    });
  }

  verifyPayment(paymentId: string) {
    this.paymentVerificationService.verifyPayment(paymentId)
      .subscribe({
        next: (verificationResponse) => {
          if (verificationResponse.success) {
            this.getEventDetails(verificationResponse.registration_id);
          }
        },
        error: () => {
          this.router.navigate(['/payment/fail']);
        }
      });
  }

  getEventDetails(registrationId: number) {
    this.paymentVerificationService.getEventRegistrationDetails(registrationId)
      .subscribe({
        next: (details) => {
          this.eventDetails = details;
          this.paymentVerified = true;
        },
        error: () => {
          this.router.navigate(['/payment/fail']);
        }
      });
  }

  printTicket() {
    window.print();
  }
}
