import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

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
 
}
