export class InitiatePaymentDto {
    registration_id: number;
    amount: number;
  }
  
  export class PaymentVerificationDto {
    payment_id: string;
  }
  
  export class PaymentResponseDto {
    registration_id: number;
    payment_link: string;
    payment_id: string;
    status: string;
  }