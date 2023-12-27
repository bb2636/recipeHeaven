import { Module } from '@nestjs/common';
import { SubCategoryController } from './sub-category.controller';
import { SubService } from './sub-category.service';
import { TopCategoryModule } from 'src/top-category/top-category.module';
import { Sub } from './sub-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubRepository } from './sub-category.repository';
import { Top } from 'src/top-category/top-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sub, Top]), TopCategoryModule],
  controllers: [SubCategoryController],
  providers: [SubService, SubRepository],
})
export class SubCategoryModule {}
