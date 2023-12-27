import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateTopDto } from './dto/create-top.dto';
import { Top } from './top-category.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export class TopRepository extends Repository<Top> {
  constructor(@InjectRepository(Top) private readonly dataSource: DataSource) {
    super(Top, dataSource.manager);
  }
  async createTop(createTopDto: CreateTopDto): Promise<Top> {
    const { topCategoryType } = createTopDto;
    const top = this.create({ topCategoryType });

    return await this.save(top);
  }
}
