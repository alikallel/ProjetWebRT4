import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, UnauthorizedException, Patch, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/add-event.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UserRole } from 'src/auth/user.entity';
import { validateUserRole } from 'src/utils/auth.utils';
import { UpdateEventDto } from './dto/update-event.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
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
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads', 
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
    limits: { fileSize: 50 * 1024 * 1024 }, 
  }))
  async createEvent(
    @Body() createEventDto: CreateEventDto, 
    @User() user, 
    @UploadedFile() file?: Express.Multer.File
    ): Promise<Event> {
    console.log('Received event data:', createEventDto);
    console.log('Received file:', file);
  
    if (user.role !== UserRole.EVENTMASTER) {
      throw new UnauthorizedException('Only event masters can create events');
    }
  
    if (user.role !== UserRole.EVENTMASTER) {
      throw new UnauthorizedException('Only event masters can create events');
    }
  
    return this.eventService.createEvent(createEventDto, user, file);
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

@Patch(':id')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
async updateEvent(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateEventDto: UpdateEventDto,
  @User() user
): Promise<Event> {
  if (user.role !== UserRole.EVENTMASTER) {
    throw new UnauthorizedException('Only event masters can update events');
  }
  return this.eventService.updateEvent(id, updateEventDto, user);
}
}

