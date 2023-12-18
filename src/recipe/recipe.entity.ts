import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
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

  @Column()
  portion: number;

  @Column()
  leadTime: number;

  @Column()
  level: number;

  @Column()
  ingredient: string; //배열

  @Column()
  ingredientUnit: string; //g, 개

  @Column()
  aveStar: number;

  @ManyToMany(() => User, (user) => user.recipes)
  user: User;
}
