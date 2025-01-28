import { Controller, Get, Param, Body, Patch } from '@nestjs/common';
import { CheckinService } from './checkin.service';
import { UserDataDto } from './dto/getlist.dto';


@Controller('checkin')
export class CheckinController {
    constructor(private readonly checkinService: CheckinService) {}

    @Get(':eventId')  
    async getEventRegistrations(
        @Param('eventId') eventId: number,): Promise<UserDataDto[]> {
        return this.checkinService.getEventRegistrations(eventId);
    }

    @Patch(':regid')
    async updateCheckInStatus(
        @Param('regid') id: number,
        @Body('checkedIn') checkedIn: boolean,): Promise<string> {
        return this.checkinService.updateCheckInStatus(id, checkedIn);
    }
}