import { IsString, IsNotEmpty, IsNumber, Min, MinLength, Matches } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty({ message: 'The event title is required.' })
  @MinLength(3, { message: 'The title must be at least 3 characters long.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'The event date is required.' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'The date must be in the format YYYY-MM-DD.' })
  date: string;

  @IsString()
  @IsNotEmpty({ message: 'The event location is required.' })
  location: string;

  @IsString()
  @IsNotEmpty({ message: 'The event description is required.' })
  description: string

  @IsNumber({}, { message: 'The price must be a valid number.' })
  @IsNotEmpty({ message: 'The event price is required.' })
  @Min(0, { message: 'The price cannot be negative.' })
  price: number;

  @IsNumber({}, { message: 'The capacity must be a valid number.' })
  @IsNotEmpty({ message: 'The event capacity is required.' })
  @Min(1, { message: 'The capacity must be at least 1.' })
  capacity: number;

  @IsNumber({}, { message: 'The id must be a valid number.' })
  organizer_id: number;
}
