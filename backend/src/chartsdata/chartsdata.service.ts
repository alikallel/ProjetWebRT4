import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventRegistration } from '../event-registrations/entities/event-registration.entity/event-registration.entity';

@Injectable()
export class ChartsdataService {

    constructor(
        @InjectRepository(EventRegistration)
        private readonly eventRegistrationRepository: Repository<EventRegistration>,
      ) {}

      async getRegisteredVsAttendees(eventId: number) {
        const registered = await this.eventRegistrationRepository
          .createQueryBuilder('registration')
          .where('registration.event_id = :eventId', { eventId })
          .getCount();
    
        const attendees = await this.eventRegistrationRepository
          .createQueryBuilder('registration')
          .where('registration.event_id = :eventId', { eventId })
          .andWhere('registration.checkedIn = :checkedIn', { checkedIn: true })
          .getCount();
    
        return {
          Reg:registered,
          Att:attendees,
        };
      }

  async getGenders(eventId: number) {
    const maleCount = await this.eventRegistrationRepository
        .createQueryBuilder('registration')
        .leftJoinAndSelect('registration.user', 'user')
        .where('registration.event_id = :eventId', { eventId })
        .andWhere('user.gender = :gender', { gender: 'male' })
        .getCount();

    const femaleCount = await this.eventRegistrationRepository
        .createQueryBuilder('registration')
        .leftJoinAndSelect('registration.user', 'user')
        .where('registration.event_id = :eventId', { eventId })
        .andWhere('user.gender = :gender', { gender: 'female' })
        .getCount();

    return {
        male: maleCount,
        female: femaleCount,
    };
  }

  // Function 3: Returns age percentages (young vs adult vs aged)
  async getAge(eventId: number) {
    const youngCount = await this.eventRegistrationRepository
        .createQueryBuilder('registration')
        .leftJoinAndSelect('registration.user', 'user')
        .where('registration.event_id = :eventId', { eventId })
        .andWhere('user.age < :youngAge', { youngAge: 18 })
        .getCount();

    const adultCount = await this.eventRegistrationRepository
        .createQueryBuilder('registration')
        .leftJoinAndSelect('registration.user', 'user')
        .where('registration.event_id = :eventId', { eventId })
        .andWhere('user.age >= :adultMinAge AND user.age <= :adultMaxAge', {
          adultMinAge: 18,
          adultMaxAge: 65,
        })
        .getCount();

    const agedCount = await this.eventRegistrationRepository
        .createQueryBuilder('registration')
        .leftJoinAndSelect('registration.user', 'user')
        .where('registration.event_id = :eventId', { eventId })
        .andWhere('user.age > :agedAge', { agedAge: 65 })
        .getCount();

    return{
        young: youngCount ,
        adult: adultCount,
        aged: agedCount ,
      };
  }
}