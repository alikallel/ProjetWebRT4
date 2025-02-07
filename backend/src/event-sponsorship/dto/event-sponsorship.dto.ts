import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateSponsorshipDto {
    @IsNotEmpty()
    @IsNumber()
    event_id: number;
  }