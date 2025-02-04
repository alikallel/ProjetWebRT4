import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from './event/event.module';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';
import { EventRegistrationsController } from './event-registrations/event-registrations.controller';
import { EventRegistrationsModule } from './event-registrations/event-registrations.module';
import { CheckinModule } from './checkin/checkin.module';
import { ChartsdataModule } from './chartsdata/chartsdata.module';
import * as dotenv from 'dotenv';

dotenv.config()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
<<<<<<< HEAD
      username: process.env.DB_USERNAME,
      password: process.env.PASSWORD,
=======
      username:process.env.DB_USERNAME,
      password: '',
>>>>>>> la
      database: process.env.DB_NAME,

      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    EventModule,
    PaymentModule,
    AuthModule,
    EventRegistrationsModule,
    CheckinModule,
    ChartsdataModule,
  ],
  controllers: [AppController, EventRegistrationsController],
  providers: [AppService],
})
export class AppModule {}
