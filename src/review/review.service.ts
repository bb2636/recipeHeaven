import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from './review.repositoy';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(private reviewRepositoty: ReviewRepository) {}

  async getAllReview(): Promise<Review[]> {
    return this.reviewRepositoty.find();
  }

  createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewRepositoty.createReview(createReviewDto);
  }

  async getReviewById(reviewId: number): Promise<Review> {
    const found = await this.reviewRepositoty.findOneBy({ reviewId });

    if (!found) {
      throw new NotFoundException(
        `reviewId가 ${reviewId}인 리뷰를 찾을 수 없습니다.`,
      );
    }
    return found;
  }

  async deleteReview(reviewId: number): Promise<void> {
    const result = await this.reviewRepositoty.delete(reviewId);

    if (result.affected === 0) {
      throw new NotFoundException(`can't find reviewId ${reviewId}`);
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
      throw new NotFoundException(
        `reviewId가 ${reviewId}인 리뷰를 찾을 수 없습니다.`,
      );
    }

    await this.reviewRepositoty.update(reviewId, updateReviewDto);
    const updateReview = await this.reviewRepositoty.findOne({
      where: { reviewId },
    });
    return updateReview;
  }
}
