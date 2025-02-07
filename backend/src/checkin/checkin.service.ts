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
                'registration.number_of_places',
                'registration.checkedIn',
            ])
            .where('registration.event_id = :eventId', { eventId })
            .getRawMany();
    
        return registrations.map((registration) => ({
            reg_id: registration.registration_id,
            username: registration.user_username,
            userPhoto: registration.userPhoto,
            status: registration.registration_status,
            numPlaces: registration.registration_number_of_places,
            registrationDate: registration.registration_registration_date,
            checkedIn: registration.registration_checkedIn,
        }));
    }

    async getUser(regId: number): Promise<UserDataDto> {
      const registration = await this.eventRegistrationRepository
          .createQueryBuilder('registration')
          .leftJoinAndSelect('registration.user', 'user')
          .select([
              'registration.id',
              'user.username',
              'user.photo AS userPhoto',
              'registration.status',
              'registration.registration_date',
              'registration.number_of_places',
              'registration.checkedIn',
          ])
          .where('registration.id = :regId', { regId })
          .getRawOne();
      if (!registration) {
          throw new Error(`Registration with ID ${regId} not found`);
      }
  
      const { 
          registration_id: reg_id, 
          user_username: username, 
          userPhoto, 
          registration_status: status, 
          registration_number_of_places: numPlaces, 
          registration_registration_date: registrationDate, 
          registration_checkedIn: checkedIn 
      } = registration;
  
      return {
          reg_id,
          username,
          userPhoto,
          status,
          numPlaces,
          registrationDate,
          checkedIn,
      };
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