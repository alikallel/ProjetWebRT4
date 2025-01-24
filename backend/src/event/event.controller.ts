import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/add-event.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getAllEvents(): Promise<Event[]> {
    return this.eventService.getAllEvents();
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventService.createEvent(createEventDto);
  }

  @Get(':id')
async getEventById(@Param('id', ParseIntPipe) id: number): Promise<Event> {
  return this.eventService.getEventById(id);
}

}
