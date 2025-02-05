import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EventSponsorship } from '../../event-sponsorship/entities/event-sponsorship.entity';

@Entity('sponsorship_payments')
export class SponsorshipPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EventSponsorship)
  @JoinColumn({ name: 'sponsorship_id' })
  sponsorship: EventSponsorship;

  @Column()
  sponsorship_id: number;

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
