import { Recipe } from 'src/recipe/recipe.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column()
  categoryName: string; //재료별_소고기

  @OneToMany((type) => Recipe, (recipe) => recipe.category, { eager: true })
  recipes: Recipe[];
}
