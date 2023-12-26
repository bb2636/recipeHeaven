import { Module } from '@nestjs/common';
import { SubCategoryController } from './sub-category.controller';
import { SubService } from './sub-category.service';
import { TopCategoryModule } from 'src/top-category/top-category.module';
import { Sub } from './sub-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubRepository } from './sub-category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Sub]), TopCategoryModule],
  controllers: [SubCategoryController],
  providers: [],
})
export class SubCategoryModule {}
