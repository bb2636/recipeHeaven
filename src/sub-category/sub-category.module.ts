import { Module } from '@nestjs/common';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryService } from './sub-category.service';
import { TopCategoryModule } from 'src/top-category/top-category.module';
import { Sub } from './sub-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TopCategoryModule, TypeOrmModule.forFeature([Sub])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
})
export class SubCategoryModule {}
