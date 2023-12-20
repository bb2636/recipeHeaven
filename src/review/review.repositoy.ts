import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';

export class ReviewRepository extends Repository<Review> {
  constructor(@InjectRepository(Review) private dataSource: DataSource) {
    super(Review, dataSource.manager);
  }
  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const { star, comment } = createReviewDto;

    const review = this.create({ star, comment });

    await this.save(review);
    return review;
  }
}
