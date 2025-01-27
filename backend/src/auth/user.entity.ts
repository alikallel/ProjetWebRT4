import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';
import { Event } from 'src/event/entities/event.entity';

export enum UserRole {
  USER = 'User',
  EVENTMASTER = 'EventMaster',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  photo: string;

@Column({
  type: 'enum',
  enum: UserRole,
  default: UserRole.USER,
})
  role: UserRole;

@OneToMany(() => Event, event => event.organizer)  
events: Event[];  
}
