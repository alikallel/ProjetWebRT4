import { Component, inject, OnInit } from '@angular/core';
import { PopularEventsService } from 'src/app/services/popular-events.service';
import { Event } from 'src/app/models/event.model';
import { SponsoredEventsService } from 'src/app/services/sponsored-events.service';

@Component({
  selector: 'app-popular-events',
  templateUrl: './popular-events.component.html', // Update to refer to the new HTML file
  styleUrls: ['./popular-events.component.css']
})
export class PopularEventsComponent implements OnInit {
  popEvents: Event[] = [];
  sponsoredEvents: any[] = [];
  popEventsService = inject(PopularEventsService);
  sponsoredEventsService = inject(SponsoredEventsService);

  ngOnInit() {
    this.popEventsService.getPopularEvents().subscribe(
      (events) => this.popEvents = events
    );
    this.sponsoredEventsService.getSponsoredEvents().subscribe(
      (events) => this.sponsoredEvents = events
    );
  }
  currentIndex = 0;
 itemsToShow = 3;
 
 get visibleSponsoredEvents() {
   return this.sponsoredEvents.slice(this.currentIndex, this.currentIndex + this.itemsToShow);
 }

 next() {
   if (this.currentIndex + this.itemsToShow < this.sponsoredEvents.length) {
     this.currentIndex++;
   }
 }

 previous() {
   if (this.currentIndex > 0) {
     this.currentIndex--;
   }
 }
}