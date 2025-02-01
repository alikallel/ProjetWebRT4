import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;
}
