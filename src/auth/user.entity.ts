import { IsEmail, IsNotEmpty } from 'class-validator';
import { Recipe } from 'src/recipe/recipe.entity';
import { Review } from 'src/review/review.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
export enum UserRole {
  ADMIN = 'admin',
  User = 'user',
}

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @OneToMany((type) => Recipe, (recipe) => recipe.user, { eager: true })
  recipes: Recipe[];

  @OneToMany((type) => Review, (review) => review.user, { eager: true })
  reviews: Review[];
}
