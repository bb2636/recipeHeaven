import { IsNotEmpty, IsString, isNotEmpty } from 'class-validator';
import { join } from 'path';
import { User } from 'src/auth/user.entity';
import { Category } from 'src/category/category.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  recipeId: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  recipeName: string;

  @Column()
  img: string;

  @Column({ type: 'int' })
  portion: number;

  @Column({ type: 'int' })
  leadTime: number;

  @Column({ type: 'int' })
  level: number;

  @Column('json')
  ingredient: { item: string; unit: string }[]; //배열안에 객체

  @Column('json')
  step: { stepNum: number; des: string; imgUrl: string }[];

  @Column()
  aveStar: number;

  @ManyToMany(() => User, (user) => user.recipes)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Category, (category) => category.recipe)
  @JoinColumn()
  categories: Category[];
}
