import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get('/')
  getAllTask(): Promise<Recipe[]> {
    return this.recipeService.getAllRecipe();
  }

  @Post()
  createRecipe(@Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return this.recipeService.createRecipe(createRecipeDto);
  }
  @Get('/:id')
  getRecipeById(@Param('id') id: number): Promise<Recipe> {
    return this.recipeService.getRecipeById(id);
  }
  @Delete('/:id')
  deleteRecipe(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.recipeService.deleteRecipe(id);
  }
}
