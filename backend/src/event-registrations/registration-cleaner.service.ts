import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository, In } from 'typeorm';
import { EventRegistration } from './entities/event-registration.entity/event-registration.entity';
import { Payment } from '../payment/entities/payment.entity/payment.entity';

@Injectable()
export class RegistrationCleanerService {
  private readonly logger = new Logger(RegistrationCleanerService.name);

  constructor(
    @InjectRepository(EventRegistration)
    private eventRegistrationRepository: Repository<EventRegistration>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>
  ) {
    this.cleanPendingRegistrations();
  }

  @Cron('*/5 * * * *') 
  async cleanPendingRegistrations() {
    try {
      const cutoffDate = new Date(Date.now() - 1500 * 1000); // 1500 seconds ago

      const registrationsToDelete = await this.eventRegistrationRepository
        .createQueryBuilder('registration')
        .leftJoinAndSelect('registration.payments', 'payment')
        .where('registration.status = :status', { status: 'PENDING' })
        .andWhere('registration.registration_date <= :cutoffDate', { cutoffDate })
        .getMany();

      if (registrationsToDelete.length === 0) {
        return;
      }

      await this.eventRegistrationRepository.manager.transaction(async transactionalEntityManager => {
        for (const registration of registrationsToDelete) {
          await transactionalEntityManager
            .getRepository(Payment)
            .createQueryBuilder()
            .delete()
            .where('registration_id = :regId', { regId: registration.id })
            .execute();
        }

        await transactionalEntityManager
          .getRepository(EventRegistration)
          .createQueryBuilder()
          .delete()
          .where('id IN (:...ids)', { ids: registrationsToDelete.map(r => r.id) })
          .execute();
      });

      this.logger.log(`Successfully cleaned ${registrationsToDelete.length} pending registrations and their payments`);
    } catch (error) {
      this.logger.error('Error cleaning pending registrations and payments:', error.message);
      this.logger.debug(error.stack);
    }
  }
}