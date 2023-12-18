import { IsNumber, IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  recipeName: string;

  @IsString()
  img: string;

  @IsNumber()
  portion: number;

  @IsNumber()
  leadTime: number;

  @IsNumber()
  level: number;

  @IsString()
  ingredient: string;

  @IsString()
  ingredientUnit: string;

  @IsNumber()
  aveStar: number;
}
