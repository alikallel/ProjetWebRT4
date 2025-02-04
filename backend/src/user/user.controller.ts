import { Body, Controller, ForbiddenException, Get, NotFoundException, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User as AuthUser} from 'src/auth/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';

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
    @Put()
    async updateUser(@Body() updateData: Partial<AuthUser>, @User() user: AuthUser): Promise<AuthUser> {
        return this.userService.updateUser(user.id, updateData);
    }
}
