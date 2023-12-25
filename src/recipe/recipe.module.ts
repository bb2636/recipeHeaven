import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RecipeRepository } from './recipe.repository';
import { SubCategoryModule } from 'src/sub-category/sub-category.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe]),
    AuthModule,
    SubCategoryModule,
    PassportModule,
  ],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository],
})
export class RecipeModule {}
