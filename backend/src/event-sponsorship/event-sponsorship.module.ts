import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventSponsorshipController } from './event-sponsorship.controller';
import { EventSponsorshipService } from './event-sponsorship.service';
import { EventSponsorship } from './entities/event-sponsorship.entity';
import { Event } from '../event/entities/event.entity';
import { SponsorshipPaymentModule } from '../sponsorship-payment/sponsorship-payment.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([EventSponsorship, Event]),
    SponsorshipPaymentModule

  ],
  controllers: [EventSponsorshipController],
  providers: [EventSponsorshipService],
  exports: [EventSponsorshipService]
})
export class EventSponsorshipModule {}