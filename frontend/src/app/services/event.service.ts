import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl, this.getAuthHeaders());
  }

  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event, this.getAuthHeaders());
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); 
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getEventsByOrganizerId(organizerId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/organizer/${organizerId}`, this.getAuthHeaders());
  }

  getMyEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/myevents`);
  }
}
