import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeModule } from 'src/recipe/recipe.module';

@Module({
  imports: [TypeOrmModule.forFeature(), RecipeModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
