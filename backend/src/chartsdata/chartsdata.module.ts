import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRegistration } from '../event-registrations/entities/event-registration.entity/event-registration.entity';
import { ChartsdataService } from './chartsdata.service';
import { ChartsdataController } from './chartsdata.controller';
import { EventModule } from 'src/event/event.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventRegistration]),EventModule],
  providers: [ChartsdataService],
  controllers: [ChartsdataController]
})
export class ChartsdataModule {}
