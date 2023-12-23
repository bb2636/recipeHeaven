import { Module } from '@nestjs/common';
import { TopCategoryController } from './top-category.controller';
import { TopCategoryService } from './top-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Top } from './top-category.entity';
import { SubCategoryModule } from 'src/sub-category/sub-category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Top]), SubCategoryModule],
  controllers: [TopCategoryController],
  providers: [TopCategoryService],
})
export class TopCategoryModule {}
