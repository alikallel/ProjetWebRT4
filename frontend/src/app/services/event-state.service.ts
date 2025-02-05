import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventStateService {
  private availablePlacesMap = new BehaviorSubject<Record<number, number>>({});
  availablePlaces$ = this.availablePlacesMap.asObservable();

  updateAvailablePlaces(eventId: number, places: number): void {
    const current = this.availablePlacesMap.value;
    this.availablePlacesMap.next({
      ...current,
      [eventId]: places
    });
  }

  getAvailablePlaces(eventId: number): number | undefined {
    return this.availablePlacesMap.value[eventId];
  }

  clearState(): void {
    this.availablePlacesMap.next({});
  }
}