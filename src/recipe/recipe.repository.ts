import { DataSource, Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';

export class RecipeRepository extends Repository<Recipe> {
  constructor(@InjectRepository(Recipe) private dataSource: DataSource) {
    super(Recipe, dataSource.manager);
  }
  async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const {
      recipeName,
      img,
      portion,
      leadTime,
      level,
      ingredient,
      ingredientUnit,
      aveStar,
    } = createRecipeDto;

    const recipe = this.create({
      recipeName,
      img,
      portion,
      leadTime,
      level,
      ingredient,
      ingredientUnit,
      aveStar,
    });

    await this.save(recipe);
    return recipe;
  }
}
