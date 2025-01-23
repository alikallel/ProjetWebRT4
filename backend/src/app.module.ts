import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { EventModule } from './event/event.module';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';
import { EventRegistrationsController } from './event-registrations/event-registrations.controller';
import { EventRegistrationsModule } from './event-registrations/event-registrations.module';
import * as dotenv from 'dotenv';

dotenv.config()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'event_app',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    EventModule,
    PaymentModule,
    AuthModule,
    EventRegistrationsModule,
  ],
  controllers: [AppController, EventRegistrationsController],
  providers: [AppService],
})
export class AppModule {}
