import { IsEmail, IsString, MinLength, IsEnum, IsDate, MaxLength, } from 'class-validator';
import { UserRole, Gender } from 'src/auth/user.entity';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole, { message: 'Role must be either "User" or "EventMaster".' })
  role: UserRole;

  @IsEnum(Gender, { message: 'Gender must be either "male" or "female".' })
  gender: Gender;

  @IsDate()
  birthdate: Date; 
}
