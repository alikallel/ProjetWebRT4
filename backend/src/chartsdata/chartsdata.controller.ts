import { Controller, Get, Param, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ChartsdataService } from './chartsdata.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { validateUserRole } from 'src/utils/auth.utils';

@UseGuards(JwtAuthGuard)
@Controller('chartsdata')
export class ChartsdataController {
  constructor(private readonly chartsdataService: ChartsdataService) {}


  @Get('reg-vs-att/:eventId')
  async getRegisteredVsAttendees(@Param('eventId') eventId: number, @User() user) {
    validateUserRole(user,"EVENTMASTER");
    return this.chartsdataService.getRegisteredVsAttendees(eventId);
  }

  @Get('genders/:eventId')
  async getGenders(@Param('eventId') eventId: number, @User() user) {
    validateUserRole(user,"EVENTMASTER");
    return this.chartsdataService.getGenders(eventId);
  }

  @Get('age/:eventId')
  async getAge(@Param('eventId') eventId: number, @User() user) {
    validateUserRole(user,"EVENTMASTER");
    return this.chartsdataService.getAge(eventId);
  }
}