import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRegistration } from '../event-registrations/entities/event-registration.entity/event-registration.entity';
import { ChartsdataService } from './chartsdata.service';
import { ChartsdataController } from './chartsdata.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EventRegistration])],
  providers: [ChartsdataService],
  controllers: [ChartsdataController]
})
export class ChartsdataModule {}
