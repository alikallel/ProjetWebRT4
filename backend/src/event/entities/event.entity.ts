import { User } from 'src/auth/user.entity';
import { EventRegistration } from 'src/event-registrations/entities/event-registration.entity/event-registration.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column() 
  date:string;

  @Column()
  location: string;

  @Column()
  description: string;

  @ManyToOne(() => User, user => user.events)
  @JoinColumn({ name: 'organizer_id' })
  organizer: User; 
  
  @Column()
  price : number;

  @Column()
  capacity: number;
  
  @OneToMany(() => EventRegistration, registration => registration.event)
  registrations: EventRegistration[];
}
