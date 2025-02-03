import { Controller, Get, Param, Body, Patch, UseGuards } from '@nestjs/common';
import { CheckinService } from './checkin.service';
import { UserDataDto } from './dto/getlist.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { validateUserRole } from 'src/utils/auth.utils';
import { User } from 'src/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('checkin')
export class CheckinController {
    constructor(private readonly checkinService: CheckinService) {}

    @Get(':eventId')  
    async getEventRegistrations(
        @Param('eventId') eventId: number, @User() user): Promise<UserDataDto[]> {
        validateUserRole(user,"EVENTMASTER");
        return this.checkinService.getEventRegistrations(eventId);
    }

    @Patch(':regid')
    async updateCheckInStatus(
        @Param('regid') id: number,
        @Body('checkedIn') checkedIn: boolean, @User() user): Promise<string> {
        validateUserRole(user,"EVENTMASTER");
        return this.checkinService.updateCheckInStatus(id, checkedIn);
    }
}