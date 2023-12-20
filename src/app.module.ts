import { Module, ValidationPipe } from '@nestjs/common';
// import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig()), AuthModule, RecipeModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
