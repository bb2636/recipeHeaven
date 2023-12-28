import { DataSource, Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { User } from 'src/auth/user.entity';

export class RecipeRepository extends Repository<Recipe> {
  constructor(@InjectRepository(Recipe) private dataSource: DataSource) {
    super(Recipe, dataSource.manager);
  }
  async createRecipe(
    createRecipeDto: CreateRecipeDto,
    email: User,
  ): Promise<Recipe> {
    const { recipeName, img, portion, leadTime, level, ingredient, step } =
      createRecipeDto;

    const recipe = this.create({
      recipeName,
      img,
      portion,
      leadTime,
      level,
      ingredient,
      step,
    });

    await this.save(recipe);
    return recipe;
  }
}
