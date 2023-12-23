import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Sub } from './sub-category.entity';
import { CreateSubDto } from './dto/create-sub.dto';

export class SubRepository extends Repository<Sub> {
  constructor(@InjectRepository(Sub) private readonly dataSource: DataSource) {
    super(Sub, dataSource.manager);
  }
  async createSub(createSubDto: CreateSubDto): Promise<Sub> {
    const { subCategoryType, topCategoryId } = createSubDto;
    const sub = this.create({ subCategoryType, topCategoryId });
    await this.save(sub);
    return sub;
  }
}
