import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

class IngredientDto {
  @IsString()
  item: string;

  @IsString()
  unit: string;
}

class stepDto {
  @IsNumber()
  stepNum: number;

  @IsString()
  des: string;

  @IsString()
  imgUrl: string;
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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => stepDto)
  step: { stepNum: number; des: string; imgUrl: string }[];
}
