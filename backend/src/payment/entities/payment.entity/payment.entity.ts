import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EventRegistration } from '../../../event-registrations/entities/event-registration.entity/event-registration.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EventRegistration)
  @JoinColumn({ name: 'registration_id' })
  registration: EventRegistration;

  @Column()
  registration_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  payment_date: Date;

  @Column({ nullable: true })
  payment_id: string;

  @Column({ nullable: true })
  payment_link: string;

  @Column({ nullable: true })
  developer_tracking_id: string;

  @Column({ nullable: true })
  payer_name: string;

  @Column({ nullable: true })
  payer_email: string;

  @Column({ nullable: true })
  payer_phone: string;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'],
    default: 'PENDING'
  })
  status: string;
}