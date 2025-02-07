import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventSponsorship } from './entities/event-sponsorship.entity';
import { CreateSponsorshipDto } from './dto/event-sponsorship.dto';
import { Event } from '../event/entities/event.entity';
import { SponsorshipPaymentService } from 'src/sponsorship-payment/sponsorship-payment.service';

@Injectable()
export class EventSponsorshipService {
  private readonly SPONSORSHIP_AMOUNT = 100000;

  constructor(
    @InjectRepository(EventSponsorship)
    private eventSponsorshipRepository: Repository<EventSponsorship>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private sponsorshipPaymentService: SponsorshipPaymentService
  ) {}

  async create(createSponsorshipDto: CreateSponsorshipDto, user) {
    const event = await this.eventRepository.findOne({
      where: { id: createSponsorshipDto.event_id }
    });

    if (!event) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }

    if (event.organizer.id !== user.id) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const existingSponsorship = await this.eventSponsorshipRepository.findOne({
      where: { 
        event_id: createSponsorshipDto.event_id,
        status: 'ACTIVE'
      }
    });

    if (existingSponsorship) {
      throw new HttpException('Event is already sponsored', HttpStatus.BAD_REQUEST);
    }

    const sponsorship = this.eventSponsorshipRepository.create({
      event_id: createSponsorshipDto.event_id,
      user_id: user.id,
      amount: this.SPONSORSHIP_AMOUNT,
      status: 'PENDING'
    });

    try {
      await this.eventSponsorshipRepository.save(sponsorship);
      
      const paymentResponse = await this.sponsorshipPaymentService.initiateSponsorshipPayment(
        sponsorship.id,
        this.SPONSORSHIP_AMOUNT
      );

      return {
        sponsorship_id: sponsorship.id,
        payment_details: paymentResponse
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create sponsorship',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findByUser(userId: number) {
    return await this.eventSponsorshipRepository.find({
      where: { user_id: userId },
      relations: ['event'],
      order: { created_at: 'DESC' }
    });
  }

  async findActiveByUser(userId: number) {
    return await this.eventSponsorshipRepository.find({
      where: { 
        user_id: userId,
        status: 'ACTIVE'
      },
      relations: ['event'],
      order: { created_at: 'DESC' }
    });
  }

  async findByEvent(eventId: number) {
    return await this.eventSponsorshipRepository.findOne({
      where: { 
        event_id: eventId,
        status: 'ACTIVE'
      },
      relations: ['user', 'event']
    });
  }

  async findAllSponsored() {
    return await this.eventSponsorshipRepository.find({
      where: { status: 'ACTIVE' },
      relations: ['event'],
      order: { created_at: 'DESC' }
    });
  }

  async updateStatus(id: number, status: string) {
    const sponsorship = await this.eventSponsorshipRepository.findOne({
      where: { id }
    });

    if (!sponsorship) {
      throw new HttpException('Sponsorship not found', HttpStatus.NOT_FOUND);
    }

    sponsorship.status = status;
    return await this.eventSponsorshipRepository.save(sponsorship);
  }
  async findOne(id: number) {
    return await this.eventSponsorshipRepository.findOne({ where: { id } });
  }
  
}