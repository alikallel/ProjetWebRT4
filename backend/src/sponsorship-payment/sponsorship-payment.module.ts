import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { SponsorshipPaymentController } from './sponsorship-payment.controller';
import { SponsorshipPaymentService } from './sponsorship-payment.service';
import { SponsorshipPayment } from './entities/payment.entity';
import { EventSponsorship } from '../event-sponsorship/entities/event-sponsorship.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SponsorshipPayment, EventSponsorship]),
    HttpModule
  ],
  controllers: [SponsorshipPaymentController],
  providers: [SponsorshipPaymentService],
  exports: [SponsorshipPaymentService]
})
export class SponsorshipPaymentModule {}
