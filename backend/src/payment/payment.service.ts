import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { Payment } from './entities/payment.entity/payment.entity';
import { EventRegistration } from '../event-registrations/entities/event-registration.entity/event-registration.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class PaymentService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(EventRegistration)
    private eventRegistrationRepository: Repository<EventRegistration>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>
  ) {}

  async initiatePayment(registrationId: number, amount: number) {
    const registration = await this.eventRegistrationRepository.findOne({
      where: { id: registrationId },
      relations: ['event', 'user']
    });

    if (!registration) {
      throw new HttpException('Registration not found', HttpStatus.NOT_FOUND);
    }

    try {
      const paymentResponse = await this.createPaymentRequest(amount);
      
      const payment = this.paymentRepository.create({
        registration_id: registrationId,
        amount,
        status: 'PENDING',
        payment_id: paymentResponse.result.payment_id,
        payment_link: paymentResponse.result.link,
        developer_tracking_id: paymentResponse.result.developer_tracking_id
      });
      
      await this.paymentRepository.save(payment);

      return {
        registration_id: registrationId,
        payment_link: payment.payment_link,
        payment_id: payment.payment_id,
        status: 'PENDING'
      };
    } catch (error) {
      throw new HttpException(
        `Payment initiation failed: ${error.message}`,
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
      success_link: process.env.FLOUCI_SUCCESS_URL,
      fail_link: process.env.FLOUCI_FAIL_URL,
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

  async verifyPayment(paymentId: string) {
    try {
      const verificationResult = await this.verifyPaymentStatus(paymentId);
      if (verificationResult.success !== true) {
        throw new HttpException('Payment verification failed', HttpStatus.BAD_REQUEST);
      }

      const payment = await this.paymentRepository.findOne({
        where: { payment_id: paymentId },
        relations: ['registration']
      });
      if (!payment) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }

    const registration = payment.registration;
    registration.payment_id = paymentId;
    await this.eventRegistrationRepository.save(registration);

      return await this.processPaymentVerification(payment, verificationResult);
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

  private async processPaymentVerification(payment: Payment, verificationResult: any) {
    console.log("this is ", verificationResult);
    console.log("this is ", payment);
    if (verificationResult.result.status === 'SUCCESS') {
      console.log("this is ", payment);
      payment.status = 'COMPLETED';
      payment.payer_name = verificationResult.result.details.name;
      payment.payer_email = verificationResult.result.details.email;
      payment.payer_phone = verificationResult.result.details.phone_number;
      console.log("this is ", payment);
      await this.paymentRepository.save(payment);

      const registration = payment.registration;
      registration.status = 'PAID';
      await this.eventRegistrationRepository.save(registration);

      return {
        success: true,
        registration_id: registration.id,
        payment_status: payment.status,
        payer_details: {
          name: payment.payer_name,
          email: payment.payer_email,
          phone: payment.payer_phone
        }
      };
    }

    payment.status = 'FAILED';
    await this.paymentRepository.save(payment);
    const registration = payment.registration;
    registration.status = 'FAILED';
    await this.eventRegistrationRepository.save(registration);

    throw new HttpException('Payment failed', HttpStatus.BAD_REQUEST);
  }
  async findPaymentsByUser(userId: number) {
    return await this.paymentRepository.find({
      where: { registration: { user_id: userId } },
      relations: ['registration', 'registration.event']
    });
  }
}