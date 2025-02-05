import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class InitiateSponsorshipPaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  sponsorship_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;
}