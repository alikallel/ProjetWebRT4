import { IsEmail, IsString, MinLength, IsEnum, IsDate, MaxLength, IsNotEmpty, MinDate, MaxDate } from 'class-validator';
import { UserRole, Gender } from 'src/auth/user.entity';
import { Transform } from 'class-transformer';

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

  @IsDate({ message: 'Invalid birthdate format.' })
  @IsNotEmpty({ message: 'Birthdate is required.' })
  @Transform(({ value }) => new Date(value)) // Ensure value is converted to Date
  @MinDate(new Date(new Date().setFullYear(new Date().getFullYear() - 120)), { message: 'You must be younger than 120 years old.' })
  @MaxDate(new Date(new Date().setFullYear(new Date().getFullYear() - 5)), { message: 'You must be at least 5 years old.' })  
  birthdate: string;
}
