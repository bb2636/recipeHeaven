import { IsString, MaxLength, MinLength, maxLength } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  recipeName: string;

  @IsString()
  img: string;

  @MinLength(1)
  @MaxLength(10)
  portion: number;

  @MinLength(1)
  leadTime: number;

  @MinLength(1)
  @MaxLength(5)
  level: number;

  @IsString()
  ingredient: string;

  @IsString()
  ingredientUnit: string;

  @MinLength(0)
  aveStar: number;
}
