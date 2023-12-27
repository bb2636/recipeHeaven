import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from './review.repositoy';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { User } from 'src/auth/user.entity';
import { DeleteReviewDto } from './dto/delete-review.dto';
import { RecipeRepository } from 'src/recipe/recipe.repository';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepositoty: ReviewRepository,
    private readonly recipeRepository: RecipeRepository,
  ) {}

  async getAllReview(): Promise<Review[]> {
    return this.reviewRepositoty.find();
  }

  async getUserAllReview(user: User): Promise<Review[]> {
    const query = this.reviewRepositoty.createQueryBuilder('review');
    query.where('review.userId = : userId', { userId: user.Id });
    const reviews = await query.getMany();
    return reviews;
  }

  async createReview(
    createReviewDto: CreateReviewDto,
    user: User,
    recipeId: number,
  ): Promise<Review> {
    const { star, comment } = createReviewDto;

    const recipe = await this.recipeRepository.findOneBy({ recipeId });

    if (!recipe) {
      throw new NotFoundException(
        `ID가 ${recipeId}인 레시피를 찾을 수 없습니다.`,
      );
    }

    const review = this.reviewRepositoty.create({
      star,
      comment,
      user,
      recipe,
    });

    await this.reviewRepositoty.save(review);
    return review;
  }

  async getReviewById(reviewId: number): Promise<Review> {
    const review = await this.reviewRepositoty.findOneBy({ reviewId });

    if (!review) {
      throw new NotFoundException(`Can't find Review with id ${reviewId}`);
    }
    return review;
  }

  async deleteReview(deleteReviewDto: DeleteReviewDto): Promise<void> {
    const { reviewId, user } = deleteReviewDto;
    const review = await this.reviewRepositoty.delete({
      reviewId,
      user: { Id: user.Id },
    });

    if (review.affected === 0) {
      throw new NotFoundException(`Can't find Review with id ${reviewId}`);
    }
  }

  async updateReview(
    reviewId: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    const review = await this.reviewRepositoty.findOne({
      where: { reviewId },
    });

    if (!review) {
      throw new NotFoundException(`Can't find Review with id ${reviewId}`);
    }

    await this.reviewRepositoty.update(reviewId, updateReviewDto);
    const updateReview = await this.reviewRepositoty.findOne({
      where: { reviewId },
    });
    return updateReview;
  }
}
