import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    username: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(['User', 'EventMaster'], { message: 'Role must be either "User" or "EventMaster".' })
    role: 'User' | 'EventMaster';
}
