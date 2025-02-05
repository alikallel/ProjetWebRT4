import { IsNumber, IsNotEmpty, Min, IsOptional, IsString, MinLength, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
    username: string
  
    @IsOptional()
    @IsString({ message: 'Image must be a string URL or file path.' })
    phtot?: string;
    @IsString()
      @MinLength(6, { message: 'Password must be longer than or equal to 6 characters.' })
      password: string;
    @IsEmail()
      email: string;

}