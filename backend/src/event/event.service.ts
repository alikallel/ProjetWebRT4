import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  getAllEvents(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  createEvent(event: Event): Promise<Event> {
    return this.eventRepository.save(event);
  }

  async getEventById(id: string): Promise<Event> {
    const eventId = Number(id);  
    if (isNaN(eventId)) {
      throw new NotFoundException(`Invalid ID: ${id}`);
    }

    const event = await this.eventRepository.findOne({
      where: { id: eventId }, 
    });
    
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
    return event;
  }
}
