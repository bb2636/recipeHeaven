import { IsNumber, IsString } from 'class-validator';

export class CreateSubDto {
  @IsString()
  subCategoryType: string;

  @IsNumber()
  topCategoryId: number;
}
