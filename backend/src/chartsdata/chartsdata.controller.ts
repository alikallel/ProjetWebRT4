import { Controller, Get, Param } from '@nestjs/common';
import { ChartsdataService } from './chartsdata.service';

@Controller('chartsdata')
export class ChartsdataController {
  constructor(private readonly chartsdataService: ChartsdataService) {}

  @Get('reg-vs-att/:eventId')
  async getRegisteredVsAttendees(@Param('eventId') eventId: number) {
    return this.chartsdataService.getRegisteredVsAttendees(eventId);
  }

  @Get('genders/:eventId')
  async getGenders(@Param('eventId') eventId: number) {
    return this.chartsdataService.getGenders(eventId);
  }

  @Get('age/:eventId')
  async getAge(@Param('eventId') eventId: number) {
    return this.chartsdataService.getAge(eventId);
  }
}