import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../../auth/user.entity';
import { Event } from '../../../event/entities/event.entity';

@Entity('event_registrations')
export class EventRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, event => event.registrations)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column()
  event_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'PAID', 'CANCELLED', 'REFUNDED'],
    default: 'PENDING'
  })
  status: string;

  @CreateDateColumn()
  registration_date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 1 })
  number_of_places: number;

  @Column({ nullable: true })
  payment_id: string;
 
  @Column({ type: 'boolean', default: false }) 
  checkedIn: boolean;

}