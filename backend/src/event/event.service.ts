import { Injectable } from '@nestjs/common';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/add-event.dto';
import { UserService } from '../user/user.service';  

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly userService: UserService, 
  ) {}

  async getAllEvents(): Promise<Event[]> {
    const currentDate = new Date().toISOString().split('T')[0]; // Current date in "YYYY-MM-DD" format
    // Filter events with date >= current date
    return this.eventRepository.find({
      where: {
        date: MoreThanOrEqual(currentDate), 
      },
    });  }

    async createEvent(createEventDto: CreateEventDto): Promise<Event> {
      const { organizer_id, ...eventData } = createEventDto;
      // Recherche l'organisateur avec le UserService
      const organizer = await this.userService.findOneById(organizer_id);
  
      if (!organizer) {
        throw new Error('Organizer not found');
      }
        const event = this.eventRepository.create({
        ...eventData,
        organizer,
      });
  
      return this.eventRepository.save(event);
    }
    
  async getEventById(id: number): Promise<Event> {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) {
      throw new Error(`Event with ID ${id} not found`);
    }
    return event;
  }
}
