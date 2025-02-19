import { Controller, Post, Body, Get, Param, UseGuards, UnauthorizedException, ParseIntPipe } from '@nestjs/common';
import { EventRegistrationsService } from './event-registrations.service';
import { CreateEventRegistrationDto } from './dto/create-event-registration.dto/create-event-registration.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { validateUserRole } from 'src/utils/auth.utils';
import { EventService } from 'src/event/event.service';

@Controller('event-registrations')
@UseGuards()
export class EventRegistrationsController {
  constructor(
    private readonly eventRegistrationsService: EventRegistrationsService,
    private readonly eventService: EventService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createEventRegistrationDto: CreateEventRegistrationDto, @User() user) {
    return this.eventRegistrationsService.create(createEventRegistrationDto, user);
  }

  @Get('user/')
  @UseGuards(JwtAuthGuard)
  findByUser(@User() user) { 
    return this.eventRegistrationsService.findByUser(user.id);
  }

  @Get('event/:eventId')
  @UseGuards(JwtAuthGuard)
  async findByEvent(@Param('eventId',ParseIntPipe) eventId, @User() user) {
    validateUserRole(user, 'EVENTMASTER'); 
    await this.eventService.validateEventOwnership(eventId, user); 
    return this.eventRegistrationsService.findByEvent(eventId );
  }
  
  @Get('available-places/:id')
  @UseGuards(JwtAuthGuard)
  async getAvailablePlaces(@Param('id', ParseIntPipe) id): Promise<number> {
    return this.eventRegistrationsService.findAvailablePlaces(id);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id',ParseIntPipe) id, @User() user) {
    return this.eventRegistrationsService.findOne(id);
  }
  
}