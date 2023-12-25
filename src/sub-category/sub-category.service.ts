import { Injectable, NotFoundException } from '@nestjs/common';
import { SubRepository } from './sub-category.repository';
import { Sub } from './sub-category.entity';
import { CreateSubDto } from './dto/create-sub.dto';
import { UpdateSubDto } from './dto/update-sub.dto';

@Injectable()
export class SubCategoryService {
  constructor(private readonly subRepository: SubRepository) {}

  async getAllCategory(): Promise<Sub[]> {
    return this.subRepository.find();
  }

  createSub(createSubDto: CreateSubDto): Promise<Sub> {
    return this.subRepository.createSub(createSubDto);
  }
  async getSubById(subCategoryId: number): Promise<Sub> {
    const subCategory = await this.subRepository.findOneBy({ subCategoryId });

    if (!subCategory) {
      throw new NotFoundException(
        `Can't find Category with id ${subCategoryId}`,
      );
    }
    return subCategory;
  }
  async deleteSub(subCategoryId: number): Promise<void> {
    const result = await this.subRepository.delete({ subCategoryId });

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Review with id ${subCategoryId}`);
    }
  }

  async updateSub(
    subCategoryId: number,
    updateSubDto: UpdateSubDto,
    topCategoryId: number,
  ): Promise<Sub> {
    const subCategory = await this.subRepository.update(
      { subCategoryId },
      { ...updateSubDto, topCategoryId },
    );

    if (subCategory.affected === 0) {
      throw new NotFoundException(
        `Can't find Category with id ${subCategoryId}`,
      );
    }
    return this.getSubById(subCategoryId);
  }
}
