// src/auth/auth.controller.ts
import {Controller, Post, Body, UseGuards, Request, Get, Req, UsePipes} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
//import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import {AuthValidationPipe} from "./auth.validationpipe";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UsePipes(AuthValidationPipe)
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    @UsePipes(AuthValidationPipe)
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getMe(@Req() req): Promise<any> {
    return req.user; 
    }

    @UseGuards(JwtAuthGuard)
    @Post('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
