import { Recipe } from 'src/recipe/recipe.entity';
import { Top } from 'src/top-category/top-category.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Sub extends BaseEntity {
  @PrimaryGeneratedColumn()
  subCategoryId: number;

  @Column()
  subCategoryType: string;

  @ManyToOne((type) => Top, (top) => top.subs, { eager: false })
  @JoinColumn({ name: 'topCategoryId' })
  top: Top;

  @OneToMany((type) => Recipe, (recipe) => recipe.sub, { eager: true })
  recipes: Recipe[];
}
