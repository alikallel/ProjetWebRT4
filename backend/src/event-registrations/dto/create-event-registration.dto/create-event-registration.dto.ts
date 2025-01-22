import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateEventRegistrationDto {
  @IsNumber()
  @IsNotEmpty()
  eventId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}