import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PaymentVerificationResponse {
  success: boolean;
  sponsorship_id: number;
  payment_status: string;
  payer_details: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface SponsorshipDetails {
  id: number;
  event_id: number;
  status: string;
  amount: number;
  created_at: Date;
  user_id: number;
  event?: {
    name: string;
    description: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SponsorshipPaymentsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  verifyPayment(paymentId: string): Observable<PaymentVerificationResponse> {
    return this.http.post<PaymentVerificationResponse>(
      `${this.apiUrl}/sponsorship-payments/verify/${paymentId}`,
      {}
    );
  }

  getSponsorshipDetails(sponsorshipId: number): Observable<SponsorshipDetails> {
    return this.http.get<SponsorshipDetails>(
      `${this.apiUrl}/event-sponsorships/${sponsorshipId}`
    );
  }
}