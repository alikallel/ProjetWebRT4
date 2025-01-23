import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  
  password: string;

  @Column({ nullable: true })
  photo: string;

  @Column()
  role: string;
 
}
