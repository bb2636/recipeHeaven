import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from 'src/auth/user.entity';

export class ReviewRepository {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async createReview(
    createReviewDto: CreateReviewDto,
    user: User,
  ): Promise<Review> {
    try {
      const { star, comment } = createReviewDto;
      const review = this.reviewRepository.create({ star, comment, user });
      await this.reviewRepository.save(review);
      return review;
    } catch (error) {
      throw new Error();
    }
  }
}
