import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { InitiatePaymentDto, PaymentVerificationDto } from './dto/payment.dto/payment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';


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
  @UseGuards(JwtAuthGuard)
  @Get('user')
  async findPaymentsByUser(@User() user) {
    return await this.paymentService.findPaymentsByUser(user.id);
  }
}
