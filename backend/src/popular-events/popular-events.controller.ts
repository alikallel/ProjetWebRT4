import { Controller, Get } from '@nestjs/common';
import { PopularEventsService } from './popular-events.service';

@Controller('popular-events')
export class PopularEventsController {
    constructor(private eventService: PopularEventsService) {}    

    @Get()
    getAllEvents() {
        return this.eventService.getPopularEvents();
      }
}
