import { DataSource, Repository } from 'typeorm';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateCategoryParentDto } from './dto/create-categoryparent.dto';

export class CategoryRepository extends Repository<Category> {
  constructor(@InjectRepository(Category) private dataSource: DataSource) {
    super(Category, dataSource.manager);
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { categoryName, categoryParent } = createCategoryDto;

    const category = this.create({
      categoryName,
      categoryParent,
    });

    await this.save(category);
    return category;
  }

  async createCategoryParent(
    createCategoryDto: CreateCategoryParentDto,
  ): Promise<Category> {
    const { categoryName } = createCategoryDto;

    const category = this.create({
      categoryName,
    });

    await this.save(category);
    return category;
  }
}
