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
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/user.entity';
// import { Sub } from 'src/sub-category/sub-category.entity';
import { DeleteRecipeDto } from './dto/delete-recipe.dto';
import { Recipe } from './recipe.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('recipes')
@UseGuards(AuthGuard())
export class RecipeController {
  constructor(private recipeService: RecipeService) {}
  //전체조회
  @Get()
  getAllRecipe(): Promise<Recipe[]> {
    return this.recipeService.getAllRecipe();
  }
  //한 유저가 등록한 전체 레시피
  @Get('/:userId')
  getUserAllRecipe(@GetUser() user: User): Promise<Recipe[]> {
    return this.recipeService.getUserAllRecipe(user);
  }
  // 유저 정보 포함한 등록
  @Post()
  @UsePipes(ValidationPipe)
  createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
    @GetUser() user: User,
  ): Promise<Recipe> {
    return this.recipeService.createRecipe(createRecipeDto, user);
  }
  //레시피 상세 조회
  @Get('/:recipeId')
  getRecipeById(@Param('recipeId') recipeId: number): Promise<Recipe> {
    return this.recipeService.getRecipeById(recipeId);
  }
  //레시피 삭제(id일치)
  @Delete('/:recipeId')
  deleteRecipe(
    @Param('recipeId', ParseIntPipe) recipeId,
    @GetUser() user: User,
    @Body() deleteRecipeDto: DeleteRecipeDto,
  ): Promise<void> {
    return this.recipeService.deleteRecipe(recipeId);
  }
  //레시피 수정(id일치)
  @Patch('/:recipeId')
  updateRecipe(
    @Param('recipeId') recipeId: number,
    @Body() recipeData: UpdateRecipeDto,
  ): Promise<Recipe> {
    return this.recipeService.updateRecipe(recipeId, recipeData);
  }
}
