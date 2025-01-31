import { IsEmail, IsString, MinLength, IsEnum, IsDateString, MaxLength, IsNotEmpty } from 'class-validator';
import { UserRole, Gender } from 'src/auth/user.entity';

export class RegisterDto {
  @IsEmail({}, { message: 'Invalid email format.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty({ message: 'Username is required.' })
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password must be longer than or equal to 6 characters.' })
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;

  @IsEnum(UserRole, { message: 'Role must be either "User" or "EventMaster".' })
  @IsNotEmpty({ message: 'Role is required.' })
  role: UserRole;

  @IsEnum(Gender, { message: 'Gender must be either "male" or "female".' })
  @IsNotEmpty({ message: 'Gender is required.' })
  gender: Gender;

  @IsDateString({}, { message: 'Invalid birthdate format.' })
  @IsNotEmpty({ message: 'Birthdate is required.' })
  birthdate: string;
}
