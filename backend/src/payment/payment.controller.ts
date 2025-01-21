import { Body, Controller, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(
        private paymentService: PaymentService
    )
    {}
    @Post()
    async payment(
        @Body('amount') amount: number
    )
    {
        return await this.paymentService.payment(amount)
    }

    @Post(':id')
    async verify(
        @Param('id') id: string
    )
    {
        return await this.paymentService.verify(id)
    }
}
