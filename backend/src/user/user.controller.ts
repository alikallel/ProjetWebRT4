import { Body, Controller, Get, NotFoundException, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/auth/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    return this.userService.updateUser(id, updateData);
  }
}
