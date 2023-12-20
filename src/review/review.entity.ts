import { User } from 'src/auth/user.entity';
import { Recipe } from 'src/recipe/recipe.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  reviewId: number;

  @Column({ type: 'int' })
  star: number;

  @Column({ type: 'text' })
  comment: Text;

  @Column({ type: 'timestamp' })
  time: Timestamp;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id' })
  user: User;

  @ManyToOne(() => Recipe)
  @JoinColumn({ name: 'recipeId' })
  recipe: Recipe;
}
