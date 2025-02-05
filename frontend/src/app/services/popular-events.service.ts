import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class PopularEventsService {

  constructor() { }

  private apiUrl = 'http://localhost:3000/popular-events';
  
    private http = inject(HttpClient);
  
    getPopularEvents(): Observable<Event[]> {
      return this.http
      .get<{data :Event[]}>(this.apiUrl)
      .pipe(map(response => response.data));
    }
    
}
