import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRegistrationsService } from './event-registrations.service';
import { EventRegistrationsController } from './event-registrations.controller';
import { EventRegistration } from './entities/event-registration.entity/event-registration.entity';
import { PaymentModule } from '../payment/payment.module';
import { Event } from '../event/entities/event.entity';
import { RegistrationCleanerService } from './registration-cleaner.service';
import { Payment } from 'src/payment/entities/payment.entity/payment.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventRegistration, Payment, Event]),
    ScheduleModule.forRoot(),
    PaymentModule
  ],
  controllers: [EventRegistrationsController],
  providers: [EventRegistrationsService,RegistrationCleanerService],
  exports: [EventRegistrationsService]
})
export class EventRegistrationsModule {}