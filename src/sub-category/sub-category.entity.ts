import { Recipe } from 'src/recipe/recipe.entity';
import { Top } from 'src/top-category/top-category.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('subCategory')
export class Sub extends BaseEntity {
  @PrimaryGeneratedColumn()
  subCategoryId: number;

  @Column()
  subCategoryType: string;

  @ManyToOne((type) => Top, (top) => top.subs, { eager: false })
  top: Top;

  @Column()
  topCategoryId: number; // 외래키

  @OneToMany((type) => Recipe, (recipe) => recipe.sub, { eager: true })
  recipes: Recipe[];
}
