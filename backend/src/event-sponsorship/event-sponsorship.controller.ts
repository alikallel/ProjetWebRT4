import { Controller, Post, Get, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { EventSponsorshipService } from './event-sponsorship.service';
import { CreateSponsorshipDto } from './dto/event-sponsorship.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../decorators/user.decorator';
import { validateUserRole } from '../utils/auth.utils';

@Controller('event-sponsorships')
export class EventSponsorshipController {
  constructor(
    private readonly eventSponsorshipService: EventSponsorshipService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createSponsorshipDto: CreateSponsorshipDto,
    @User() user
  ) {
    validateUserRole(user, 'EVENTMASTER');
    return await this.eventSponsorshipService.create(createSponsorshipDto, user);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async findMySponshorships(@User() user) {
    return await this.eventSponsorshipService.findByUser(user.id);
  }

  @Get('user/active')
  @UseGuards(JwtAuthGuard)
  async findMyActiveSponshorships(@User() user) {
    return await this.eventSponsorshipService.findActiveByUser(user.id);
  }

  @Get('event/:eventId')
  @UseGuards(JwtAuthGuard)
  async findByEvent(@Param('eventId', ParseIntPipe) eventId: number) {
    return await this.eventSponsorshipService.findByEvent(eventId);
  }

  @Get('sponsored')
  async findAllSponsored() {
    return await this.eventSponsorshipService.findAllSponsored();
  }
  @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.eventSponsorshipService.findOne(id);
    }
}