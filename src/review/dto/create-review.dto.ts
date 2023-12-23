import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  star: number;

  @IsString()
  comment: string;
}
