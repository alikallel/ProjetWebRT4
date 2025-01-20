import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.entity';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getAllEvents(): Promise<Event[]> {
    return this.eventService.getAllEvents();
  }

  @Post()
  createEvent(@Body() event: Event): Promise<Event> {
    return this.eventService.createEvent(event);
  }
  // Route pour récupérer un événement par ID
  @Get(':id')
  async getEventById(@Param('id') id: string): Promise<Event> {
    return this.eventService.getEventById(id);
  }

}
