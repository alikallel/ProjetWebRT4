import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { SponsorshipPayment } from './entities/payment.entity';
import { EventSponsorship } from '../event-sponsorship/entities/event-sponsorship.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class SponsorshipPaymentService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(EventSponsorship)
    private eventSponsorshipRepository: Repository<EventSponsorship>,
    @InjectRepository(SponsorshipPayment)
    private sponsorshipPaymentRepository: Repository<SponsorshipPayment>
  ) {}

  async initiateSponsorshipPayment(sponsorshipId: number, amount: number) {
    const sponsorship = await this.eventSponsorshipRepository.findOne({
      where: { id: sponsorshipId },
      relations: ['event', 'user']
    });

    if (!sponsorship) {
      throw new HttpException('Sponsorship not found', HttpStatus.NOT_FOUND);
    }
    try {
      const paymentResponse = await this.createPaymentRequest(amount);
      
      const payment = this.sponsorshipPaymentRepository.create({
        sponsorship_id: sponsorshipId,
        amount,
        status: 'PENDING',
        payment_id: paymentResponse.result.payment_id,
        payment_link: paymentResponse.result.link,
        developer_tracking_id: paymentResponse.result.developer_tracking_id
      });
      
      await this.sponsorshipPaymentRepository.save(payment);

      return {
        sponsorship_id: sponsorshipId,
        payment_link: payment.payment_link,
        payment_id: payment.payment_id,
        status: 'PENDING'
      };
    } catch (error) {
      throw new HttpException(
        `Sponsorship payment initiation failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private async createPaymentRequest(amount: number) {
    const url = process.env.FLOUCI_URL;
    const payload = {
      app_token: process.env.FLOUCI_TOKEN,
      app_secret: process.env.FLOUCI_SECRET,
      amount: amount.toString(),
      accept_card: "true",
      session_timeout_secs: 1200,
      success_link: process.env.FLOUCI_SPONSORSHIP_SUCCESS_URL,
      fail_link: process.env.FLOUCI_SPONSORSHIP_FAIL_URL,
      developer_tracking_id: process.env.FLOUCI_ID
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, payload, {
          headers: { 'Content-Type': 'application/json' }
        })
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Payment request failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async verifySponsorshipPayment(paymentId: string) {
    try {
      const verificationResult = await this.verifyPaymentStatus(paymentId);
      if (verificationResult.success !== true) {
        throw new HttpException('Payment verification failed', HttpStatus.BAD_REQUEST);
      }

      const payment = await this.sponsorshipPaymentRepository.findOne({
        where: { payment_id: paymentId },
        relations: ['sponsorship']
      });
      
      if (!payment) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }

      return await this.processSponsorshipPaymentVerification(payment, verificationResult);
    } catch (error) {
      throw new HttpException(
        `Payment verification failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private async verifyPaymentStatus(paymentId: string) {
    const url = process.env.FLOUCI_VERIFY_URL;
    const headers = {
      'Content-Type': 'application/json',
      'apppublic': process.env.FLOUCI_TOKEN,
      'appsecret': process.env.FLOUCI_SECRET
    };

    const response = await firstValueFrom(
      this.httpService.get(`${url}${paymentId}`, { headers })
    );
    return response.data;
  }

  private async processSponsorshipPaymentVerification(payment: SponsorshipPayment, verificationResult: any) {
    if (verificationResult.result.status === 'SUCCESS') {
      payment.status = 'COMPLETED';
      payment.payer_name = verificationResult.result.details.name;
      payment.payer_email = verificationResult.result.details.email;
      payment.payer_phone = verificationResult.result.details.phone_number;
      await this.sponsorshipPaymentRepository.save(payment);

      const sponsorship = payment.sponsorship;
      sponsorship.status = 'ACTIVE';
      await this.eventSponsorshipRepository.save(sponsorship);

      return {
        success: true,
        sponsorship_id: sponsorship.id,
        payment_status: payment.status,
        payer_details: {
          name: payment.payer_name,
          email: payment.payer_email,
          phone: payment.payer_phone
        }
      };
    }

    payment.status = 'FAILED';
    await this.sponsorshipPaymentRepository.save(payment);
    const sponsorship = payment.sponsorship;
    sponsorship.status = 'FAILED';
    await this.eventSponsorshipRepository.save(sponsorship);

    throw new HttpException('Payment failed', HttpStatus.BAD_REQUEST);
  }

  async findSponsorshipPaymentsByUser(userId: number) {
    return await this.sponsorshipPaymentRepository.find({
      where: { sponsorship: { user_id: userId } },
      relations: ['sponsorship', 'sponsorship.event']
    });
  }
}
