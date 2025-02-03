import { Controller, Get, Param, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ChartsdataService } from './chartsdata.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { validateUserRole } from 'src/utils/auth.utils';
import { EventService } from 'src/event/event.service';

@UseGuards(JwtAuthGuard)
@Controller('chartsdata')
export class ChartsdataController {
  constructor(
    private readonly chartsdataService: ChartsdataService,
    private readonly eventService: EventService

  ) {}


  @Get('reg-vs-att/:eventId')
  async getRegisteredVsAttendees(@Param('eventId') eventId: number, @User() user) {
    validateUserRole(user,"EVENTMASTER");
    await this.eventService.validateEventOwnership(eventId, user); 
    return this.chartsdataService.getRegisteredVsAttendees(eventId);
  }

  @Get('genders/:eventId')
  async getGenders(@Param('eventId') eventId: number, @User() user) {
    validateUserRole(user,"EVENTMASTER");
    await this.eventService.validateEventOwnership(eventId, user); 
    return this.chartsdataService.getGenders(eventId);
  }

  @Get('age/:eventId')
  async getAge(@Param('eventId') eventId: number, @User() user) {
    validateUserRole(user,"EVENTMASTER");
    await this.eventService.validateEventOwnership(eventId, user); 
    return this.chartsdataService.getAge(eventId);
  }
}