// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
//import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

<<<<<<< HEAD
  @Get('me')
  @UseGuards(AuthGuard('jwt')) // Protège la route, nécessite un token JWT valide
  async getMe(@Req() req): Promise<any> {
    return req.user; // Retourne l'utilisateur actuellement connecté
  }
=======
    @UseGuards(JwtAuthGuard)
    @Post('profile')
    getProfile(@Request() req) {
        return req.user;
    }
>>>>>>> adf89e2abdfacace06e18c66d20e9336aa00f7e3
}
