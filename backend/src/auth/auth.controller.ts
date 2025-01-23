import { Controller, Post, Body, Get, Param, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as  path from 'path';
import * as multer from 'multer';
import { Express } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() body: { email: string; password: string }) {
        return this.authService.register(body.email, body.password);
    }

    @Post('login')
    login(@Body() body: { email: string; password: string }) {
        return this.authService.login(body.email, body.password);
    }
    @Get(':id')
    async getUser(@Param('id') id: number) {
    return this.authService.getUserById(id);
  }
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateData: { password?: string; photo?: string }
  ): Promise<any> {
    return this.authService.updateUser(id, updateData);
  }
}

