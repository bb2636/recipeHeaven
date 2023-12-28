import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user-decorator';
// import { AuthGuard } from 'src/auth/auth.guard';

@Controller('reviews')
// @UseGuards(AuthGuard)
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get()
  getAllReview(): Promise<Review[]> {
    return this.reviewService.getAllReview();
  }
  @Get()
  getUserAllReview(@GetUser() user: User): Promise<Review[]> {
    return this.reviewService.getUserAllReview(user);
  }

  @Post('/:recipeId')
  @UsePipes(ValidationPipe)
  createReview(
    @Body() createReviewDto: CreateReviewDto,
    @GetUser() user: User,
    @Param('recipeId') recipeId: number,
  ): Promise<Review> {
    return this.reviewService.createReview(createReviewDto, user, recipeId);
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
  deleteReview(
    @Param('reviewId', ParseIntPipe) reviewId,
    @GetUser() user: User,
  ): Promise<void> {
    return this.reviewService.deleteReview(reviewId);
  }
}
