import { Component, inject, OnInit } from '@angular/core';
import { PopularEventsService } from 'src/app/services/popular-events.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-popular-events',
  templateUrl: './popular-events.component.html', // Update to refer to the new HTML file
  styleUrls: ['./popular-events.component.css']
})
export class PopularEventsComponent implements OnInit {
  popEvents: Event[] = [];
  popEventsService = inject(PopularEventsService);

  ngOnInit() {
    this.popEventsService.getPopularEvents().subscribe(
      (events) => {
        this.popEvents = events;
      }
    );
  }
}
