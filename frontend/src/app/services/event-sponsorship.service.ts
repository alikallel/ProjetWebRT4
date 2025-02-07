import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SponsorshipResponse {
  sponsorship_id: number;
  payment_details: {
    payment_link: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class EventSponsorshipService {
  private apiUrl = 'http://localhost:3000/event-sponsorships';

  constructor(private http: HttpClient) {}

  create(sponsorshipDto: { event_id: number }): Observable<SponsorshipResponse> {
    return this.http.post<SponsorshipResponse>(this.apiUrl, sponsorshipDto);
  }

  findByEvent(eventId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/event/${eventId}`);
  }

  findMySponshorships(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user`);
  }

  findMyActiveSponshorships(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/active`);
  }

  findAllSponsored(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sponsored`);
  }
}