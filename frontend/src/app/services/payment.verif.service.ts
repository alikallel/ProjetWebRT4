import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface PaymentVerificationResponse {
  success: boolean;
  registration_id: number;
  payment_status: string;
  payer_details: {
    name: string;
    email: string;
    phone: string;
  };
}

interface EventRegistrationDetails {
  id: number;
  event_id: number;
  user_id: number;
  status: string;
  registration_date: string;
  amount: string;
  payment_id: string;
  event: {
    id: number;
    title: string;
    date: string;
    location: string;
    description: string;
    price: number;
  };
  user: {
    id: number;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PaymentVerificationService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  verifyPayment(paymentId: string): Observable<PaymentVerificationResponse> {
    return this.http.post<PaymentVerificationResponse>(`${this.apiUrl}/payment/verify/${paymentId}`, {});
  }

  getEventRegistrationDetails(registrationId: number): Observable<EventRegistrationDetails> {
    return this.http.get<EventRegistrationDetails>(`${this.apiUrl}/event-registrations/${registrationId}`);
  }
}