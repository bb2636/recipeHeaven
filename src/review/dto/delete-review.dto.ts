import { User } from 'src/auth/user.entity';

export class DeleteReviewDto {
  user: User;
  reviewId: number;

  constructor(deleteReviewDto: { reviewId: number; user: User }) {
    const { user, reviewId } = deleteReviewDto;
    this.user = user;
    this.reviewId = reviewId;
  }
}
