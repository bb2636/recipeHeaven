import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipeRepository } from './recipe.repository';
import { Recipe } from './recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(private recipeRepository: RecipeRepository) {}

  async getAllRecipe(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }
  createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return this.recipeRepository.createRecipe(createRecipeDto);
  }
  async getRecipeById(recipeId: number): Promise<Recipe> {
    const found = await this.recipeRepository.findOneBy({ recipeId });

    if (!found) {
      throw new NotFoundException(
        `recipeId가 ${recipeId}인 레시피를 찾을 수 없습니다`,
      );
    }
    return found;
  }
  async deleteRecipe(recipeId: number): Promise<void> {
    const result = await this.recipeRepository.delete(recipeId);

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
      throw new NotFoundException(
        `recipeId가 ${recipeId}인 레시피를 찾을 수 없습니다`,
      );
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
