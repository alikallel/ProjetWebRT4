import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { firstValueFrom } from 'rxjs';

dotenv.config()
@Injectable()
export class PaymentService {
    constructor(
        private readonly httpService: HttpService,
    ) {}

    async payment(amount: number) {
        const url = process.env.FLOUCI_URL
        const payload = {
            "app_token": process.env.FLOUCI_TOKEN, 
            "app_secret": process.env.FLOUCI_SECRET,
            "amount": amount.toString(),
            "accept_card": "true",
            "session_timeout_secs": 1200,
            "success_link": process.env.FLOUCI_SUCCESS_URL,
            "fail_link": process.env.FLOUCI_FAIL_URL,
            "developer_tracking_id": process.env.FLOUCI_ID
        }
        const headers = {
            'Content-Type': 'application/json'
          }

        try {
            const response = await firstValueFrom(
                this.httpService.post(url, payload,{headers})
            );
            
            return response.data;
            
        } catch (error) {
            throw new HttpException(
                `Payment request failed: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    async verify (id:string )
    {
        const id_payment= id
        const url= process.env.FLOUCI_VERIFY_URL;
        const headers = {
            'Content-Type': 'application/json',
            'apppublic': process.env.FLOUCI_TOKEN,   
            'appsecret': process.env.FLOUCI_SECRET  
        };
        try {
            const response = await firstValueFrom(
                this.httpService.get(url+id_payment,{headers})
            );
            
            return response.data;
            
        } catch (error) {
            throw new HttpException(
                `Payment request failed: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        
    }
}