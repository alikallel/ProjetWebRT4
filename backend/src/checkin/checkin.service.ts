import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventRegistration } from '../event-registrations/entities/event-registration.entity/event-registration.entity';
import { UserDataDto } from './dto/getlist.dto';

@Injectable()
export class CheckinService {
    constructor(
        @InjectRepository(EventRegistration)
        private readonly eventRegistrationRepository: Repository<EventRegistration>,
      ) {}
    
    async getEventRegistrations(eventId: number): Promise<UserDataDto[]> {
        const registrations = await this.eventRegistrationRepository
            .createQueryBuilder('registration')
            .leftJoinAndSelect('registration.user', 'user')
            .select([
                'registration.id',
                'user.username',
                'user.photo as userPhoto',
                'registration.status',
                'registration.registration_date',
                'registration.checkedIn',
            ])
            .where('registration.event_id = :eventId', { eventId })
            .getRawMany();

    
        return registrations.map((registration) => ({
            reg_id: registration.registration_id,
            username: registration.username,
            userPhoto: registration.userPhoto,
            status: registration.registration_status,
            registrationDate: registration.registration_registration_date,
            checkedIn: registration.registration_checkedIn,
        }));
    }

    async updateCheckInStatus(
        id: number,
        checkedIn: boolean,
      ): Promise<string> {
        try {
          const result = await this.eventRegistrationRepository.update(id, { checkedIn });
          if (result.affected === 0) {
            throw new Error(`User with ID ${id} not found.`);
          }
          return 'Updated successfully';
        } catch (error) {
          console.error('Error updating check-in status:', error);
          throw new Error('Failed to update check-in status.');
        }
      }

}