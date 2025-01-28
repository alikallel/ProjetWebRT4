import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { InitiatePaymentDto, PaymentVerificationDto } from './dto/payment.dto/payment.dto';


@Controller('payment')
export class PaymentController {
    constructor(
        private paymentService: PaymentService
    )
    {}
    @Post('initiate')
    async initiatePayment(@Body() initiatePaymentDto: InitiatePaymentDto) {
    return await this.paymentService.initiatePayment(
      initiatePaymentDto.registration_id,
      initiatePaymentDto.amount
    );
  }

  @Post('verify/:paymentId')
  async verifyPayment(@Param('paymentId') paymentId: string) {
    return await this.paymentService.verifyPayment(paymentId);
  }
  @Get('user/:userId')
  async findPaymentsByUser(@Param('userId') userId: string) {
    return await this.paymentService.findPaymentsByUser(+userId);
  }
}
