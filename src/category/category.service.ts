import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAllCategory(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async createTop(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.createCategory(createCategoryDto);
  }
  async getCategoryById(categoryId: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Can't find Category with id ${category}`);
    }
    return category;
  }
  async deleteCategory(categoryId: number): Promise<void> {
    const result = await this.categoryRepository.delete({ categoryId });

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Review with id ${categoryId}`);
    }
  }

  async updateCategory(
    categoryId: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const topCategory = await this.categoryRepository.findOne({
      where: { categoryId },
    });

    if (!topCategory) {
      throw new NotFoundException(`Can't find Category with id ${categoryId}`);
    }

    await this.categoryRepository.update(categoryId, updateCategoryDto);
    const updateCategory = await this.categoryRepository.findOne({
      where: { categoryId },
    });
    return updateCategory;
  }
}
