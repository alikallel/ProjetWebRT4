import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
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

  addEvent(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData, this.getAuthHeaders());
  }
  

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`, this.getAuthHeaders()).pipe(
      catchError(error => {
        console.error('Error fetching event:', error);
        throw error;
      })
    );
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
    return this.http.get<Event[]>(`${this.apiUrl}/myevents`, this.getAuthHeaders());
  }

  patchEvent(id: string, payload: Partial<Event>): Observable<Event> {
    return this.http.patch<Event>(`${this.apiUrl}/${id}`, payload, this.getAuthHeaders());
  }
  updateEventImage(id: string, formData: FormData): Observable<Event> {
    return this.http.patch<Event>(
      `${this.apiUrl}/${id}/image`,
      formData,
      this.getAuthHeaders()
    );
  }
  
}
