import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRegistration } from './entities/event-registration.entity/event-registration.entity';
import { CreateEventRegistrationDto } from './dto/create-event-registration.dto/create-event-registration.dto';
import { Event } from '../event/entities/event.entity';
import { Repository } from 'typeorm';


@Injectable()
export class EventRegistrationsService {
  constructor(
    @InjectRepository(EventRegistration)
    private eventRegistrationRepository: Repository<EventRegistration>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,  ) {}

    async create(createEventRegistrationDto: CreateEventRegistrationDto, user) {
      const event = await this.eventRepository.findOne({
        where: { id: createEventRegistrationDto.eventId }
      });
    
      if (!event) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
    
      // Check existing registration for the user
      const existingRegistration = await this.eventRegistrationRepository.findOne({
        where: { 
          event_id: event.id, 
          user_id: user.id 
        }
      });
    
      // Calculate total booked places - include both PAID and FREE statuses
      const totalBookedPlaces = await this.eventRegistrationRepository
        .createQueryBuilder('registration')
        .where('registration.event_id = :eventId', { eventId: event.id })
        .andWhere('registration.status IN (:...statuses)', { statuses: ['PAID', 'FREE'] })
        .select('SUM(registration.number_of_places)', 'total')
        .getRawOne();
      
      const currentBookedPlaces = Number(totalBookedPlaces.total) || 0;
      const requestedPlaces = Number(createEventRegistrationDto.number_of_places);
      
      if (currentBookedPlaces + requestedPlaces > event.capacity) {
        throw new HttpException(
          `Only ${event.capacity - currentBookedPlaces} places remaining`,
          HttpStatus.BAD_REQUEST
        );
      }
  
      if (existingRegistration) {
        existingRegistration.number_of_places += requestedPlaces;
        existingRegistration.amount = event.price * existingRegistration.number_of_places;
        // For free events, mark as FREE
        if (event.price === 0) {
          existingRegistration.status = 'FREE';
        }
        
        await this.eventRegistrationRepository.save(existingRegistration);
        
        return {
          registration_id: existingRegistration.id,
          status: existingRegistration.status,
          total_places: existingRegistration.number_of_places
        };
      }
  
      const registration = await this.createRegistration(createEventRegistrationDto, user);
      if (event.price === 0) {
        registration.status = 'FREE';
      }
      
      try {
        await this.eventRegistrationRepository.save(registration);
  
        return {
          registration_id: registration.id,
          status: registration.status
        };
      } catch (error) {
        await this.eventRegistrationRepository.remove(registration);
        throw new HttpException(
          'Failed to create registration',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    async findAvailablePlaces(eventId: number): Promise<number> {
      const event = await this.eventRepository.findOne({ where: { id: eventId } });
      
      if (!event) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
    
      const totalBookedPlaces = await this.eventRegistrationRepository
        .createQueryBuilder('registration')
        .where('registration.event_id = :eventId', { eventId })
        .andWhere('registration.status IN (:...statuses)', { statuses: ['PAID', 'FREE'] })
        .select('SUM(registration.number_of_places)', 'total')
        .getRawOne();
      
      const currentBookedPlaces = totalBookedPlaces.total || 0;
      return event.capacity - currentBookedPlaces;
    }
  

  private async createRegistration(dto: CreateEventRegistrationDto , user) {
    const event = await this.eventRepository.findOne({
      where: { id: dto.eventId }
    });
  
    if (!event) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }
    const totalAmount = event.price * dto.number_of_places;
  
    const registration = this.eventRegistrationRepository.create({
      event_id: dto.eventId,
      user_id: user.id,
      amount: totalAmount,
      number_of_places: dto.number_of_places,
      status: 'PENDING'
    });
  
    return registration;
  }

  
  async findOne(id: number) {
    const registration = await this.eventRegistrationRepository.findOne({
      where: { id },
      relations: ['event', 'user']
    });

    if (!registration) {
      throw new HttpException('Registration not found', HttpStatus.NOT_FOUND);
    }

    return registration;
  }

  async findByUser(userId: number) {
    return await this.eventRegistrationRepository.find({
      where: { user_id: userId },
      relations: ['event']
    });
  }

  async findByEvent(eventId: number) {
    return await this.eventRegistrationRepository.find({
      where: { event_id: eventId},
      relations: ['user']
    });
  }
  

}