import { IsNotEmpty, IsString, isNotEmpty, isString } from 'class-validator';
import { Recipe } from 'src/recipe/recipe.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  //   ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column()
  categoryName: string;

  @Column()
  categoryParent: string;

  @OneToMany(() => Recipe, (recipe) => recipe.categories)
  @JoinColumn()
  recipe: Recipe;
}
