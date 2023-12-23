import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/auth/user.entity';
import { Review } from 'src/review/review.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
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

  @ManyToOne((type) => User, (user) => user.recipes, { eager: false })
  user: User;

  @OneToMany((type) => Review, (review) => review.recipe, { eager: true })
  reviews: Review[];
}
