import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RecipeRepository } from './recipe.repository';
import { SubCategoryModule } from 'src/sub-category/sub-category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), AuthModule, SubCategoryModule],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository],
})
export class RecipeModule {}
