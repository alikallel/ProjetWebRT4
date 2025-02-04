import { IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateEventRegistrationDto {
  @IsNumber()
  @IsNotEmpty()
  eventId: number;



  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  number_of_places: number;

}