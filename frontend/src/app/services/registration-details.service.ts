import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

 

  getEventBookings(eventId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/event-registrations/event/${eventId}`);
  }
}