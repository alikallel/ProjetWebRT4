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

  async getAge(eventId: number) {
    const ageRanges = [
        { min: 0, max: 18, label: '0-18' },
        { min: 19, max: 35, label: '19-35' },
        { min: 36, max: 55, label: '36-55' },
        { min: 56, max: 999, label: '56+' },
    ];

    const ageCountPromises = ageRanges.map(async (range) => {
        const count = await this.eventRegistrationRepository
            .createQueryBuilder('registration')
            .leftJoinAndSelect('registration.user', 'user')
            .where('registration.event_id = :eventId', { eventId })
            // Calculate age using birthdate and current date
            .andWhere('TIMESTAMPDIFF(YEAR, user.birthdate, CURDATE()) BETWEEN :minAge AND :maxAge', {
                minAge: range.min,
                maxAge: range.max,
            })
            .getCount();

        return { [range.label]: count };
    });

    const results = await Promise.all(ageCountPromises);

    const ageCount = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});

    return ageCount;
}


}