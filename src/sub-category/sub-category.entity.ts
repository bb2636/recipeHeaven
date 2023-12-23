import { Top } from 'src/top-category/top-category.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Sub extends BaseEntity {
  @PrimaryGeneratedColumn()
  subCategoryId: number;

  @Column()
  subCategoryType: string;

  @ManyToOne(() => Top, (top) => top.subs, { eager: false })
  top: Top;

  @Column()
  topCategoryId: number; // 외래키
}
