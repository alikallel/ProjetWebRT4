import { Body, Controller, ForbiddenException, Get, NotFoundException, Param, Put, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User as AuthUser} from 'src/auth/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @UseGuards(JwtAuthGuard)
    @Get()
    async getUser(@User() user: AuthUser): Promise<AuthUser> {
        const foundUser = await this.userService.getUserById(user.id);
        if (!foundUser) {
            throw new NotFoundException('User not found');
        }
        return foundUser;
    }
  


  /*@Put(':id')
  
  async updateUser(
    @Param('id') id: number,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    return this.userService.updateUser(id, updateData);
  }*/
    @UseGuards(JwtAuthGuard)
    @Put()
    async updateUser(@Body() updateData: Partial<AuthUser>, @User() user: AuthUser): Promise<AuthUser> {
        return this.userService.updateUser(user.id, updateData);
    }
    @UseGuards(JwtAuthGuard)
    @Put('upload-profile-image')
    @UseInterceptors(FileInterceptor('file'))
    async uploadProfileImage(@UploadedFile() file: Express.Multer.File, @User() user: AuthUser) {
      console.log('Received user:', user); // Debugging line

      if (!user) {
          throw new UnauthorizedException('User not found in request. Ensure you are authenticated.');
      }  
      return this.userService.uploadProfileImage(user.id, file);
    }
}
