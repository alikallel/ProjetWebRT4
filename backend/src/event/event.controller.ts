import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, UnauthorizedException } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/add-event.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UserRole } from 'src/auth/user.entity';
import { validateUserRole } from 'src/utils/auth.utils';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllEvents(): Promise<Event[]> {
    return this.eventService.getAllEvents();
  }
  
  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  createEvent(@Body() createEventDto: CreateEventDto, @User() user): Promise<Event> {
    if (user.role !== UserRole.EVENTMASTER) {
      throw new UnauthorizedException('Only event masters can create events');
    }
    return this.eventService.createEvent(createEventDto, user);
  }
  @Get('organizer/:organizerId')
  @UseGuards(JwtAuthGuard)
async getEventsByOrganizerId(@Param('organizerId', ParseIntPipe) organizerId: number): Promise<Event[]> {
  return this.eventService.getEventsByOrganizerId(organizerId);
}
@Get('myevents')
@UseGuards(JwtAuthGuard)
async getMyEvents(@User() user): Promise<Event[]> {
    validateUserRole(user, 'EVENTMASTER'); 
    return this.eventService.getEventsByOrganizerId(user.id);
}
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getEventById(@Param('id', ParseIntPipe) id: number): Promise<Event> {
    return this.eventService.getEventById(id);
  }


}