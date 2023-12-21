import { User } from 'src/auth/user.entity';
import { Recipe } from 'src/recipe/recipe.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  reviewId: number;

  @Column({ type: 'int' })
  star: number;

  @Column()
  comment: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @ManyToOne((type) => User, (user) => user.reviews, { eager: false })
  user: User;

  @ManyToOne((type) => Recipe, (recipe) => recipe.reviews, { eager: false })
  recipe: Recipe;
}
