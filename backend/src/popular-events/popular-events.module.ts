import { Module } from '@nestjs/common';
import { PopularEventsController } from './popular-events.controller';
import { PopularEventsService } from './popular-events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRegistration } from '../event-registrations/entities/event-registration.entity/event-registration.entity';
import { Event } from '../event/entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventRegistration, Event])
  ],
  controllers: [PopularEventsController],
  providers: [PopularEventsService],
})
export class PopularEventsModule {}