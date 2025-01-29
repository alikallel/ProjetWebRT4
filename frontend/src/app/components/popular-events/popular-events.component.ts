import { Component, inject } from '@angular/core';
import { PopularEventsService } from 'src/app/services/popular-events.service';

@Component({
  selector: 'app-popular-events',
  templateUrl: './popular-events.component.html',
  styleUrls: ['./popular-events.component.css']
})
export class PopularEventsComponent {
  
  popEventsService = inject(PopularEventsService);
popEvents = [ 'ev1 ', 'ev2'];
  //popEvents = this.popEventsService.getPopularEvents();

}
