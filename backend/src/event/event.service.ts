import { Injectable, UnauthorizedException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/add-event.dto';
import { UserService } from '../user/user.service';  
import { User } from 'src/auth/user.entity';
import { UpdateEventDto } from './dto/update-event.dto';

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

    async createEvent(createEventDto: CreateEventDto, user: User, file?: Express.Multer.File): Promise<Event> {
      if (!user) {
        throw new UnauthorizedException('User not authenticated');
      }
  
      const imagePath = file ? file.path : null;  
      const event = this.eventRepository.create({
        ...createEventDto,
        image: imagePath, 
        organizer: user,
      });
  
      try {
        return await this.eventRepository.save(event);
      } catch (error) {
        console.error('Error saving event:', error);
        throw new InternalServerErrorException('Failed to save event');
      }
          }
    
  async getEventById(id: number): Promise<Event> {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) {
      throw new Error(`Event with ID ${id} not found`);
    }
    return event;
  }

  async getEventsByOrganizerId(organizerId: number): Promise<Event[]> {
    const events = await this.eventRepository.find({
      where: { organizer: { id: organizerId } },
      relations: ['organizer'],
    });
  
    if (events.length === 0) {
      throw new NotFoundException(`No events found for organizer with ID ${organizerId}`);
    }
  
    return events;
  }
  
  async validateEventOwnership(eventId: number, user: User) {
    const event = await this.getEventById(eventId);

    if (event.organizer.id !== user.id) {
      throw new UnauthorizedException('You are not authorized to manage this event.');
    }
    
    return event;
  }
  async updateEvent(id: number, updateEventDto: UpdateEventDto, user: User): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['organizer'], 
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    if (event.organizer.id !== user.id) {  
      throw new UnauthorizedException('You can only update your own events');
    }

    Object.assign(event, updateEventDto);
    return this.eventRepository.save(event);
  }
}
