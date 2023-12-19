import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

class IngredientDto {
  @IsString()
  item: string;

  @IsString()
  unit: string;
}

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  ingredient: { item: string; unit: string }[];

  // @IsArray()
  // ingredientUnit: string;

  @IsNumber()
  aveStar: number;
}
