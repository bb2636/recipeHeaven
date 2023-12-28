import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipeRepository } from './recipe.repository';
import { Recipe } from './recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { User } from 'src/auth/user.entity';
import { DeleteRecipeDto } from './dto/delete-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async getAllRecipe(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }
  async getUserAllRecipe(user: User): Promise<Recipe[]> {
    const query = this.recipeRepository.createQueryBuilder('recipe');
    query.where('recipe.userId = : userId', { userId: user.Id });
    const recipes = await query.getMany();
    return recipes;
  }
  async createRecipe(
    createRecipeDto: CreateRecipeDto,
    user: User,
  ): Promise<Recipe> {
    return this.recipeRepository.createRecipe(createRecipeDto, user);
  }
  async getRecipeById(recipeId: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOneBy({ recipeId });

    if (!recipe) {
      throw new NotFoundException(`Can't find Recipe with id ${recipeId}`);
    }
    return recipe;
  }
  async deleteRecipe(deleteRecipeDto: DeleteRecipeDto): Promise<void> {
    const { recipeId, user } = deleteRecipeDto;
    const recipe = await this.recipeRepository.delete({
      recipeId,
      user: { Id: user.Id },
    });

    if (recipe.affected === 0) {
      throw new NotFoundException(`Can't find Recipe with id ${recipeId}`);
    }
  }
  async updateRecipe(
    recipeId: number,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({
      where: {
        recipeId,
      },
    });

    if (!recipe) {
      throw new NotFoundException(`Can't find Recipe with id ${recipeId}`);
    }
    await this.recipeRepository.update(recipeId, updateRecipeDto);
    const updateRecipe = await this.recipeRepository.findOne({
      where: {
        recipeId,
      },
    });
    return updateRecipe;
  }
}
