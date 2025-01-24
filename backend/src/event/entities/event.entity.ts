import { EventRegistration } from 'src/event-registrations/entities/event-registration.entity/event-registration.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  @Column()
  organizer: number;

  @Column()
  price : number;

  @Column()
  capacity: number;
  
  @OneToMany(() => EventRegistration, registration => registration.event)
  registrations: EventRegistration[];
}
