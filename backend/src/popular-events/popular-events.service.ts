import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRegistration } from '../event-registrations/entities/event-registration.entity/event-registration.entity';
import { Event } from '../event/entities/event.entity';
import { In, Repository } from 'typeorm';

const popularEventsToShowCount = 3;

@Injectable()
export class PopularEventsService {
    constructor(
        @InjectRepository(EventRegistration)
        private eventRegistrationRepository: Repository<EventRegistration>,
        @InjectRepository(Event)
        private eventRepository: Repository<Event>,
    ) {}

    async getPopularEvents() {
        try {
            // First get the most popular event IDs
            const popularEvents = await this.eventRegistrationRepository
                .createQueryBuilder('er')
                .select('er.event_id', 'event_id')
                .addSelect('COUNT(*)', 'count')
                .where('er.status IN (:...statuses)', { statuses: ['PAID', 'FREE'] })
                .groupBy('er.event_id')
                .orderBy('count', 'DESC')
                .limit(popularEventsToShowCount)
                .getRawMany();

            if (!popularEvents.length) {
                // If no events with registrations, return newest events
                return await this.eventRepository.find({
                    order: { id: 'DESC' },
                    take: popularEventsToShowCount,
                    relations: ['organizer']
                });
            }

            // Extract event IDs
            const eventIds = popularEvents.map(e => e.event_id);

            // Fetch full event details
            const events = await this.eventRepository.find({
                where: { id: In(eventIds) },
                relations: ['organizer']
            });

            // Sort events according to popularity order
            return eventIds
                .map(id => events.find(event => event.id === id))
                .filter(Boolean);

        } catch (error) {
            console.error('Error fetching popular events:', error);
            // Return newest events as fallback
            return await this.eventRepository.find({
                order: { id: 'DESC' },
                take: popularEventsToShowCount,
                relations: ['organizer']
            });
        }
    }
}