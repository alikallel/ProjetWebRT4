import { Controller, Post, Body, Get, Param, UseGuards, UnauthorizedException } from '@nestjs/common';
import { EventRegistrationsService } from './event-registrations.service';
import { CreateEventRegistrationDto } from './dto/create-event-registration.dto/create-event-registration.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UserRole } from 'src/auth/user.entity';

@Controller('event-registrations')
@UseGuards()
export class EventRegistrationsController {
  constructor(
    private readonly eventRegistrationsService: EventRegistrationsService
  ) {}

  @Post()
  create(@Body() createEventRegistrationDto: CreateEventRegistrationDto) {
    return this.eventRegistrationsService.create(createEventRegistrationDto);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.eventRegistrationsService.findByUser(+userId);
  }

  @Get('event/:eventId')
  findByEvent(@Param('eventId') eventId: string) {
    return this.eventRegistrationsService.findByEvent(+eventId);
  }
  
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @User() user) {
    if (user.role !== UserRole.EVENTMASTER) {
      throw new UnauthorizedException('Only admins can access this resource');
    }
    return this.eventRegistrationsService.findOne(+id);
  }

  
}