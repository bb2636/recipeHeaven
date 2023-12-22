import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipeRepository } from './recipe.repository';
import { Recipe } from './recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class RecipeService {
  constructor(private recipeRepository: RecipeRepository) {}

  async getAllRecipe(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }
  async getUserAllRecipe(user: User): Promise<Recipe[]> {
    const query = this.recipeRepository.createQueryBuilder('recipe');
    query.where('recipe.userId = : userId', { userId: user.id });
    const recipes = await query.getMany();
    return recipes;
  }
  createRecipe(createRecipeDto: CreateRecipeDto, user: User): Promise<Recipe> {
    return this.recipeRepository.createRecipe(createRecipeDto, user);
  }
  async getRecipeById(recipeId: number): Promise<Recipe> {
    const found = await this.recipeRepository.findOneBy({ recipeId });

    if (!found) {
      throw new NotFoundException(`Can't find Recipe with id ${recipeId}`);
    }
    return found;
  }
  async deleteRecipe(recipeId: number, user: User): Promise<void> {
    const result = await this.recipeRepository.delete({
      recipeId,
      user: { id: user.id },
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Recipe with id ${recipeId}`);
    }
  }
  async updateRecipe(
    recipeId: number,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<Recipe> {
    const found = await this.recipeRepository.findOne({
      where: {
        recipeId,
      },
    });

    if (!found) {
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
