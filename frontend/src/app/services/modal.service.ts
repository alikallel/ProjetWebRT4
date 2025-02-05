import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private eventSource = new BehaviorSubject<Event | null>(null);
  private isOpenSource = new BehaviorSubject<boolean>(false);

  currentEvent: Observable<Event | null> = this.eventSource.asObservable();
  isOpen: Observable<boolean> = this.isOpenSource.asObservable();

  openModal(event: Event): void {
    this.eventSource.next(event);
    this.isOpenSource.next(true);
  }

  closeModal(): void {
    this.eventSource.next(null);
    this.isOpenSource.next(false);
  }

  clearEvent(): void {
    this.eventSource.next(null);
  }
}