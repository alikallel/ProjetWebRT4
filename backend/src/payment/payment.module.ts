import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { HttpModule } from '@nestjs/axios';
import { PaymentService } from './payment.service';

@Module({
    imports: [HttpModule,],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentModule {}
