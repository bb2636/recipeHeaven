import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateSubDto {
  @IsString()
  subCategoryType: string;

  @IsNumber()
  @Type(() => Number)
  readonly topCategoryId: number;
}
