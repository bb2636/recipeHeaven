import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeModule } from 'src/recipe/recipe.module';
import { AuthModule } from 'src/auth/auth.module';
import { Review } from './review.entity';
import { ReviewRepository } from './review.repositoy';
import { PassportModule } from '@nestjs/passport';
import { RecipeRepository } from 'src/recipe/recipe.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, RecipeRepository]),
    AuthModule,
    RecipeModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
