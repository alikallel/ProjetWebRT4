import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SponsorshipPaymentsService, PaymentVerificationResponse, SponsorshipDetails } from '../../services/sponsorship-payments.service';
import { finalize } from 'rxjs/operators';
import {faStar } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-sponsorship-payments',
  templateUrl: './sponsorship-payments.component.html',
  styleUrls: ['./sponsorship-payments.component.css']
})
export class SponsorshipPaymentsComponent implements OnInit {
  paymentVerified = false;
  isLoading = true;
  error: string | null = null;
  paymentDetails: PaymentVerificationResponse | null = null;
  sponsorshipDetails: SponsorshipDetails | null = null;
  faStar = faStar;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sponsorshipPaymentsService: SponsorshipPaymentsService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const paymentId = params['payment_id'];
      if (paymentId) {
        this.verifyPayment(paymentId);
      } else {
        this.error = 'No payment ID provided';
        this.isLoading = false;
      }
    });
  }

  private verifyPayment(paymentId: string): void {
    this.isLoading = true;
    this.error = null;

    this.sponsorshipPaymentsService.verifyPayment(paymentId)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response: PaymentVerificationResponse) => {
          this.paymentVerified = response.success;
          this.paymentDetails = response;
          if (response.sponsorship_id) {
            this.loadSponsorshipDetails(response.sponsorship_id);
          }
        },
        error: (error: any) => {
          this.error = 'Failed to verify payment. Please try again later.';
          console.error('Payment verification error:', error);
        }
      });
  }

  private loadSponsorshipDetails(sponsorshipId: number): void {
    this.sponsorshipPaymentsService.getSponsorshipDetails(sponsorshipId)
      .subscribe({
        next: (details: SponsorshipDetails) => {
          this.sponsorshipDetails = details;
        },
        error: (error: any) => {
          console.error('Error loading sponsorship details:', error);
        }
      });
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}