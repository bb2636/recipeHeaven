import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from './review.repositoy';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ReviewService {
  constructor(private reviewRepositoty: ReviewRepository) {}

  async getAllReview(): Promise<Review[]> {
    return this.reviewRepositoty.find();
  }

  createReview(createReviewDto: CreateReviewDto, user: User): Promise<Review> {
    return this.reviewRepositoty.createReview(createReviewDto, user);
  }

  async getReviewById(reviewId: number): Promise<Review> {
    const found = await this.reviewRepositoty.findOneBy({ reviewId });

    if (!found) {
      throw new NotFoundException(`Can't find Review with id ${reviewId}`);
    }
    return found;
  }

  async deleteReview(reviewId: number): Promise<void> {
    const result = await this.reviewRepositoty.delete(reviewId);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Review with id ${reviewId}`);
    }
  }

  async updateReview(
    reviewId: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    const found = await this.reviewRepositoty.findOne({
      where: { reviewId },
    });

    if (!found) {
      throw new NotFoundException(`Can't find Review with id ${reviewId}`);
    }

    await this.reviewRepositoty.update(reviewId, updateReviewDto);
    const updateReview = await this.reviewRepositoty.findOne({
      where: { reviewId },
    });
    return updateReview;
  }
}
