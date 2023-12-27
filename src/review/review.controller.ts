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
import { AuthGuard } from '@nestjs/passport';

@Controller('reviews')
// @UseGuards(AuthGuard())
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get()
  async getAllReview(): Promise<Review[]> {
    return this.reviewService.getAllReview();
  }
  @Get()
  async getUserAllReview(@GetUser() user: User): Promise<Review[]> {
    return this.reviewService.getUserAllReview(user);
  }

  @Post('/:recipeId')
  @UsePipes(ValidationPipe)
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
    @GetUser() user: User,
    @Param('recipeId', ParseIntPipe) recipeId: string,
  ): Promise<Review> {
    return this.reviewService.createReview(
      createReviewDto,
      user,
      parseInt(recipeId),
    );
  }

  @Get('/:reviewId')
  async getReviewById(
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<Review> {
    return this.reviewService.getReviewById(reviewId);
  }

  @Patch('/:reviewId')
  async updateReview(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Body() reviewData: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.updateReview(reviewId, reviewData);
  }

  @Delete('/:reviewId')
  async deleteReview(
    @Param('reviewId', ParseIntPipe) reviewId,
    @GetUser() user: User,
  ): Promise<void> {
    return this.reviewService.deleteReview(reviewId);
  }
}
