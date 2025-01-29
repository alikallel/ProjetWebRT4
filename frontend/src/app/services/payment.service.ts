import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegistrationRequest {
  eventId: number;
  userId: number;
  number_of_places: number;
}

interface PaymentInitiateRequest {
  registration_id: number;
  amount: number;
}

interface PaymentResponse {
  registration_id: number;
  payment_link: string;
  payment_id?: string;
  status: string;
}
export interface UserPayment {
  id: number;
  amount: string;
  payment_date: string;
  payment_id: string;
  status: string;
  registration: {
    id: any;
    event: {
      title: string;
      date: string;
      location: string;
    };
    number_of_places: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createEventRegistration(eventId: number, numberOfPlaces: number): Observable<PaymentResponse> {
    const request: RegistrationRequest = {
      eventId: eventId,
      userId: 1, // Static user ID, ask Mohamed how to get the user ID
      number_of_places: numberOfPlaces
    };
    return this.http.post<PaymentResponse>(`${this.apiUrl}/event-registrations`, request);
  }

  initiatePayment(registrationId: number, amount: number): Observable<PaymentResponse> {
    const request: PaymentInitiateRequest = {
      registration_id: registrationId,
      amount: amount
    };
    return this.http.post<PaymentResponse>(`${this.apiUrl}/payment/initiate`, request);
  }
  getUserPayments(): Observable<UserPayment[]> {
    return this.http.get<UserPayment[]>(`${this.apiUrl}/payment/user`);
  }
}