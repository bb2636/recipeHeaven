import { Injectable, NotFoundException } from '@nestjs/common';
import { SubRepository } from './sub-category.repository';
import { Sub } from './sub-category.entity';
import { CreateSubDto } from './dto/create-sub.dto';
import { UpdateSubDto } from './dto/update-sub.dto';
import { TopRepository } from 'src/top-category/top-category.repository';

@Injectable()
export class SubService {
  constructor(
    private readonly subRepository: SubRepository,
    private readonly topRepository: TopRepository,
  ) {}

  async getAllCategory(): Promise<Sub[]> {
    return this.subRepository.find();
  }

  async createSub(
    topCategoryId: number,
    createSubDto: CreateSubDto,
  ): Promise<Sub> {
    const top = await this.topRepository.findOneBy({ topCategoryId });
    if (!top) {
      throw new NotFoundException(
        `Can't find Top Category with id ${topCategoryId}`,
      );
    }

    const sub = this.subRepository.create({
      top,
      ...createSubDto,
    });

    return this.subRepository.save(sub);
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
    const top = await this.topRepository.findOneBy({ topCategoryId });
    if (!top) {
      throw new NotFoundException(
        `Can't find Top Category with id ${topCategoryId}`,
      );
    }

    await this.subRepository.update(subCategoryId, {
      ...updateSubDto,
      top,
    });

    return this.getSubById(subCategoryId);
  }
}
