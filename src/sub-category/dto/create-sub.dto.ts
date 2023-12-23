import { IsString } from 'class-validator';

export class CreateSubDto {
  @IsString()
  subCategoryType: string;
}
