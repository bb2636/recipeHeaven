import { Injectable, NotFoundException } from '@nestjs/common';
import { TopRepository } from './top-category.repository';
import { Top } from './top-category.entity';
import { UpdateTopDto } from './dto/update-top.dto';
import { CreateTopDto } from './dto/create-top.dto';

@Injectable()
export class TopCategoryService {
  constructor(private readonly topRepository: TopRepository) {}

  async getAllCategory(): Promise<Top[]> {
    return this.topRepository.find();
  }

  async createTop(createTopDto: CreateTopDto): Promise<Top> {
    return this.topRepository.createTop(createTopDto);
  }
  async getTopById(topCategoryId: number): Promise<Top> {
    const topCategory = await this.topRepository.findOneBy({ topCategoryId });

    if (!topCategory) {
      throw new NotFoundException(
        `Can't find Category with id ${topCategoryId}`,
      );
    }
    return topCategory;
  }
  async deleteTop(topCategoryId: number): Promise<void> {
    const result = await this.topRepository.delete({ topCategoryId });

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Review with id ${topCategoryId}`);
    }
  }

  async updateTop(
    topCategoryId: number,
    updateTopDto: UpdateTopDto,
  ): Promise<Top> {
    const topCategory = await this.topRepository.findOne({
      where: { topCategoryId },
    });

    if (!topCategory) {
      throw new NotFoundException(
        `Can't find Category with id ${topCategoryId}`,
      );
    }

    await this.topRepository.update(topCategoryId, updateTopDto);
    const updateTop = await this.topRepository.findOne({
      where: { topCategoryId },
    });
    return updateTop;
  }
}
