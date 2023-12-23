import { IsString } from 'class-validator';

export class CreateTopDto {
  @IsString()
  topCategoryType: string;
}
