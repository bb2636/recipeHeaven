import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipeRepository } from './recipe.repository';
import { Recipe } from './recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(private recipeRepository: RecipeRepository) {}

  async getAllRecipe(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }
  createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return this.recipeRepository.createRecipe(createRecipeDto);
  }
  async getRecipeById(id: number): Promise<Recipe> {
    const found = await this.recipeRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(
        `recipeId가 ${id}인 레시피를 찾을 수 없습니다`,
      );
    }
    return found;
  }
  async deleteRecipe(id: number): Promise<void> {
    const result = await this.recipeRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Recipe with id ${id}`);
    }
  }
}
