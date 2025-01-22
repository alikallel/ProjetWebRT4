import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { EventRegistrationsService } from './event-registrations.service';
import { CreateEventRegistrationDto } from './dto/create-event-registration.dto/create-event-registration.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventRegistrationsService.findOne(+id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.eventRegistrationsService.findByUser(+userId);
  }

  @Get('event/:eventId')
  findByEvent(@Param('eventId') eventId: string) {
    return this.eventRegistrationsService.findByEvent(+eventId);
  }
}