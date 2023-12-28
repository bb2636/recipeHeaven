import { Module } from '@nestjs/common';
import { TopCategoryController } from './top-category.controller';
import { TopCategoryService } from './top-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Top } from './top-category.entity';
import { TopRepository } from './top-category.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Top]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TopCategoryController],
  providers: [TopCategoryService, TopRepository],
  exports: [TopRepository],
})
export class TopCategoryModule {}
