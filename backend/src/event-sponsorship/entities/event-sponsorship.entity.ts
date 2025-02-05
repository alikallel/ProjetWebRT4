import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Event } from '../../event/entities/event.entity';
import { User } from 'src/auth/user.entity';

@Entity('event_sponsorships')
export class EventSponsorship {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column()
  event_id: number;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'ACTIVE', 'CANCELLED'],
    default: 'PENDING'
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  amount: number;
  
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;
}

