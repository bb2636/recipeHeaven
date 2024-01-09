import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/auth/user.entity';
import { Category } from 'src/category/category.entity';
import { Review } from 'src/review/review.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @Column('json')
  ingredient: { item: string; unit: string }[]; //배열안에 객체

  @Column('json')
  step: { stepNum: number; des: string; imgUrl: string }[];

  @ManyToOne(() => User, (user) => user.recipes, { eager: false })
  user: User;

  @OneToMany(() => Review, (review) => review.recipe, { eager: true })
  reviews: Review[];

  @JoinColumn()
  @ManyToOne(() => Category, (category) => category.recipes, {
    eager: false,
  })
  category: Category;
}
