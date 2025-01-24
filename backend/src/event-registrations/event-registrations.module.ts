import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRegistrationsService } from './event-registrations.service';
import { EventRegistrationsController } from './event-registrations.controller';
import { EventRegistration } from './entities/event-registration.entity/event-registration.entity';
import { PaymentModule } from '../payment/payment.module';
import { Event } from '../event/entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventRegistration, Event]),
    PaymentModule
  ],
  controllers: [EventRegistrationsController],
  providers: [EventRegistrationsService],
  exports: [EventRegistrationsService]
})
export class EventRegistrationsModule {}