import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SponsoredEventsService {
  private apiUrl = 'http://localhost:3000/event-sponsorships/sponsored';
  private http = inject(HttpClient);

  getSponsoredEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
