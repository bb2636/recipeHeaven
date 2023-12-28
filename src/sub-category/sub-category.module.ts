import { Module } from '@nestjs/common';
import { SubCategoryController } from './sub-category.controller';
import { SubService } from './sub-category.service';
import { TopCategoryModule } from 'src/top-category/top-category.module';
import { Sub } from './sub-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubRepository } from './sub-category.repository';
import { TopRepository } from 'src/top-category/top-category.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sub, TopRepository]),
    TopCategoryModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [SubCategoryController],
  providers: [SubService, SubRepository],
})
export class SubCategoryModule {}
