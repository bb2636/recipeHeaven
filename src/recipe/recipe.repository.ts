import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { User } from 'src/auth/user.entity';

export class RecipeRepository {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async createRecipe(
    createRecipeDto: CreateRecipeDto,
    user: User,
  ): Promise<Recipe> {
    try {
      const { recipeName, img, portion, leadTime, level, ingredient, step } =
        createRecipeDto;
      const recipe = this.recipeRepository.create({
        recipeName,
        img,
        portion,
        leadTime,
        level,
        ingredient,
        step,
        user,
      });
      await this.recipeRepository.save(recipe);
      return recipe;
    } catch (errpr) {
      throw new Error('레시피 생성 중 에러가 발생했습니다');
    }
  }
}
