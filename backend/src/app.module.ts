import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event/event.entity';
import { EventModule } from './event/event.module';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'eventplanner',
      entities: [Event],
      synchronize: true,
    }),
    EventModule,
    PaymentModule,
    AuthModule,
  ],
  controllers: [AppController, ],
  providers: [AppService],
})
export class AppModule {}
