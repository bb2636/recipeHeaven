import {
  Controller,
  Get,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TopCategoryService } from './top-category.service';
import { Top } from './top-category.entity';
import { CreateTopDto } from './dto/create-top.dto';
import { UpdateTopDto } from './dto/update-top.dto';

@Controller('top-categorys')
export class TopCategoryController {
  constructor(private topService: TopCategoryService) {}

  @Get()
  getAllCategory(): Promise<Top[]> {
    return this.topService.getAllCategory();
  }
  @Get('/:topCategoryId')
  getTopById(@Param('topCategoryId') topCategoryId: number): Promise<Top> {
    return this.topService.getTopById(topCategoryId);
  }

  @Post()
  createTop(@Body() createTopDto: CreateTopDto): Promise<Top> {
    return this.topService.createTop(createTopDto);
  }

  @Patch('/:topCategoryId')
  updateReview(
    @Param('topCategoryId') topCategoryId: number,
    @Body() topData: UpdateTopDto,
  ): Promise<Top> {
    return this.topService.updateTop(topCategoryId, topData);
  }
  @Delete('/:topCategoryId')
  deleteReview(
    @Param('topCategoryId', ParseIntPipe) topCategoryId,
  ): Promise<void> {
    return this.topService.deleteTop(topCategoryId);
  }
}
