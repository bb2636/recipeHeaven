import { Sub } from 'src/sub-category/sub-category.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Top extends BaseEntity {
  @PrimaryGeneratedColumn()
  topCategoryId: number;

  @Column()
  topCategoryType: string; //material=재료별, contextual=상황별

  @OneToMany((type) => Sub, (sub) => sub.top, { eager: true })
  subs: Sub[];
}
