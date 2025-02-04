import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class InitiatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  registration_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;
}

export class PaymentVerificationDto {
  @IsNotEmpty()
  @IsString()
  payment_id: string;
}