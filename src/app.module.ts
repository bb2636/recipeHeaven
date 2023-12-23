import { Module, ValidationPipe } from '@nestjs/common';
// import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { RecipeModule } from './recipe/recipe.module';
import { ReviewModule } from './review/review.module';
// import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig()),
    AuthModule,
    RecipeModule,
    ReviewModule,
    // UploadModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
