import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { NotFoundError } from 'rxjs';
import { CreateCategoryParentDto } from './dto/create-categoryparent.dto';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.createCategory(createCategoryDto);
  }

  // createCategoryParent(
  //   createCategoryParentDto: CreateCategoryParentDto,
  // ): Promise<Category> {
  //   return this.categoryRepository.createCategoryParent(
  //     createCategoryParentDto,
  //   );
  // }

  async deleteCategory(categoryId: number): Promise<void> {
    const result = await this.categoryRepository.delete(categoryId);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find category with id ${categoryId}`);
    }
  }

  async updateCategory(
    categoryId: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const found = await this.categoryRepository.findOne({
      where: { categoryId },
    });

    if (!found) {
      throw new NotFoundException(
        `${categoryId}인 카테고리를 찾을 수 없습니다.`,
      );
    }

    await this.categoryRepository.update(categoryId, updateCategoryDto);
    const updateCategory = await this.categoryRepository.findOne({
      where: { categoryId },
    });

    return updateCategory;
  }
}
