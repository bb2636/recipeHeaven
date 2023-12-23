import { Module } from '@nestjs/common';
import { TopCategoryController } from './top-category.controller';
import { TopCategoryService } from './top-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Top } from './top-category.entity';
import { TopRepository } from './top-category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Top])],
  controllers: [TopCategoryController],
  providers: [TopCategoryService, TopRepository],
})
export class TopCategoryModule {}
