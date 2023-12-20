import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewService {
  private review = [];
  getAllReview() {
    return this.review;
  }
}
