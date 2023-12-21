import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/user.entity';

@Controller('recipe')
@UseGuards(AuthGuard())
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get('/')
  getAllTask(): Promise<Recipe[]> {
    return this.recipeService.getAllRecipe();
  }

  @Post('/insert')
  @UsePipes(ValidationPipe)
  createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
    @GetUser() user: User,
  ): Promise<Recipe> {
    return this.recipeService.createRecipe(createRecipeDto, user);
  }
  @Get('/:recipeId')
  getRecipeById(@Param('recipeId') recipeId: number): Promise<Recipe> {
    return this.recipeService.getRecipeById(recipeId);
  }
  @Delete('/:recipeId')
  deleteRecipe(@Param('recipeId', ParseIntPipe) recipeId): Promise<void> {
    return this.recipeService.deleteRecipe(recipeId);
  }
  @Patch('/:recipeId')
  updateRecipe(
    @Param('recipeId') recipeId: number,
    @Body() recipeData: UpdateRecipeDto,
  ): Promise<Recipe> {
    return this.recipeService.updateRecipe(recipeId, recipeData);
  }
}
