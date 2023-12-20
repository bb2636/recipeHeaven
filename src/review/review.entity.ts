import { User } from 'src/auth/user.entity';
import { Recipe } from 'src/recipe/recipe.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id' })
  user: User;

  @ManyToOne(() => Recipe)
  @JoinColumn({ name: 'recipeId' })
  recipe: Recipe;
}
