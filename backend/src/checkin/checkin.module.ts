import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRegistration } from '../event-registrations/entities/event-registration.entity/event-registration.entity';
import { CheckinController } from './checkin.controller';
import { CheckinService } from './checkin.service';

@Module({
    imports: [TypeOrmModule.forFeature([EventRegistration])],
    controllers: [CheckinController],
    providers: [CheckinService],
})
export class CheckinModule {}