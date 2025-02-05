import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRegistration } from 'src/event-registrations/entities/event-registration.entity/event-registration.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PopularEventsService {

    constructor(
        @InjectRepository(EventRegistration)
        private eventRegistrationRepository: Repository<EventRegistration>,
        @InjectRepository(Event)
        private eventRepository: Repository<Event>,  ) {}
    async getPopularEvents(): Promise<Event[]> {
        const popularEvents = await this.eventRegistrationRepository.query(
          'select count(event_id) as count, event_id from event_registrations join event on event_registrations.event_id = event.id group by event_id order by count desc limit 3'
        )
        return popularEvents;
      }
}
