// src/modules/eventRegistrations/event-registrations.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRegistration } from './entities/event-registration.entity/event-registration.entity';
import { CreateEventRegistrationDto } from './dto/create-event-registration.dto/create-event-registration.dto';
import { Repository } from 'typeorm';
import { PaymentService } from '../payment/payment.service';


@Injectable()
export class EventRegistrationsService {
  constructor(
    @InjectRepository(EventRegistration)
    private eventRegistrationRepository: Repository<EventRegistration>,
  ) {}

  async create(createEventRegistrationDto: CreateEventRegistrationDto) {
    await this.validateRegistration(createEventRegistrationDto);

    const registration = await this.createRegistration(createEventRegistrationDto);
    
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

  private async validateRegistration(dto: CreateEventRegistrationDto) {
    const existingRegistration = await this.eventRegistrationRepository.findOne({
      where: {
        event_id: dto.eventId,
        user_id: dto.userId
      }
    });

    if (existingRegistration) {
      throw new HttpException(
        'User already registered for this event',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  private async createRegistration(dto: CreateEventRegistrationDto) {
    const registration = this.eventRegistrationRepository.create({
      event_id: dto.eventId,
      user_id: dto.userId,
      amount: dto.amount,
      status: 'PENDING'
    });

    return await this.eventRegistrationRepository.save(registration);
  }


  async updateStatus(registrationId: number, status: string) {
    const registration = await this.eventRegistrationRepository.findOne({
      where: { id: registrationId }
    });

    if (!registration) {
      throw new HttpException('Registration not found', HttpStatus.NOT_FOUND);
    }

    registration.status = status;
    return await this.eventRegistrationRepository.save(registration);
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
      where: { event_id: eventId },
      relations: ['user']
    });
  }
}