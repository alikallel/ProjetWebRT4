import { Component, Input } from '@angular/core';
import { Event } from '../../models/event.model'; // Import the Event interface

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  @Input() event!: Event; 
}
