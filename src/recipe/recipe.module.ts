import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RecipeRepository } from './recipe.repository';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from 'src/auth/user.repository';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, UserRepository]),
    AuthModule,
    // PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository, AuthService, JwtService],
  exports: [RecipeRepository],
})
export class RecipeModule {}
