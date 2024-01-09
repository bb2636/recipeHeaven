import { InternalServerErrorException } from '@nestjs/common';
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
@Unique(['nickname', 'email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  email: string;

  @Column()
  @IsNotEmpty()
  nickname: string;

  @Column()
  profilePicture: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @OneToMany((type) => Recipe, (recipe) => recipe.user, { eager: true })
  recipes: Recipe[];

  @OneToMany((type) => Review, (review) => review.user, { eager: true })
  reviews: Review[];
}
