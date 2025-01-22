import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity/payment.entity';
import { EventRegistration } from '../event-registrations/entities/event-registration.entity/event-registration.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Payment, EventRegistration])
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule {}