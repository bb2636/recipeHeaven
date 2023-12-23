import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from 'src/auth/user.entity';

export class ReviewRepository extends Repository<Review> {
  constructor(
    @InjectRepository(Review) private readonly dataSource: DataSource,
  ) {
    super(Review, dataSource.manager);
  }
  async createReview(
    createReviewDto: CreateReviewDto,
    user: User,
  ): Promise<Review> {
    const { star, comment } = createReviewDto;

    const review = this.create({ star, comment, user });

    await this.save(review);
    return review;
  }
}
