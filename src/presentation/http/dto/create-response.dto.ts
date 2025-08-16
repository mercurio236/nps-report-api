import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  MaxLength,
} from 'class-validator';
export class CreateResponseDto {
  @IsUUID() companyId!: string;
  @IsInt() @Min(0) @Max(5) stars!: number;
  @IsOptional() @IsString() @MaxLength(1000) comment?: string;
}
