import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { create } from 'domain';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get('/')
  getAllTask(): Promise<Review[]> {
    return this.reviewService.getAllReview();
  }

  @Post()
  createReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewService.createReview(createReviewDto);
  }

  @Get('/:reviewId')
  getReviewById(@Param('reviewId') reviewId: number): Promise<Review> {
    return this.reviewService.getReviewById(reviewId);
  }

  @Patch('/:reviewId')
  updateReview(
    @Param('reviewId') reviewId: number,
    @Body() reviewData: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.updateReview(reviewId, reviewData);
  }

  @Delete('/:reviewId')
  deleteReview(@Param('reviewId', ParseIntPipe) reviewId): Promise<void> {
    return this.reviewService.deleteReview(reviewId);
  }
}
