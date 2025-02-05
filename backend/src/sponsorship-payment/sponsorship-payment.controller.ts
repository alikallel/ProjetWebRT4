import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SponsorshipPaymentService } from './sponsorship-payment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../decorators/user.decorator';
import { InitiateSponsorshipPaymentDto } from './dto/sponsorship-payment.dto';
import { validateUserRole } from '../utils/auth.utils';

@Controller('sponsorship-payments')
export class SponsorshipPaymentController {
  constructor(
    private readonly sponsorshipPaymentService: SponsorshipPaymentService
  ) {}

  @Post('initiate')
  @UseGuards(JwtAuthGuard)
  async initiateSponsorshipPayment(
    @Body() initiatePaymentDto: InitiateSponsorshipPaymentDto,
    @User() user
  ) {
    validateUserRole(user, 'EVENTMASTER');
    return await this.sponsorshipPaymentService.initiateSponsorshipPayment(
      initiatePaymentDto.sponsorship_id,
      initiatePaymentDto.amount * 1000
    );
  }

  @Post('verify/:paymentId')
  async verifySponsorshipPayment(@Param('paymentId') paymentId: string) {
    return await this.sponsorshipPaymentService.verifySponsorshipPayment(paymentId);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async findSponsorshipPaymentsByUser(@User() user) {
    return await this.sponsorshipPaymentService.findSponsorshipPaymentsByUser(user.id);
  }
}
