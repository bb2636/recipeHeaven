import {
  Controller,
  Get,
  Body,
  Delete,
  Param,
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
  async getAllCategory(): Promise<Top[]> {
    return this.topService.getAllCategory();
  }
  @Get('/:topCategoryId')
  async getTopById(
    @Param('topCategoryId') topCategoryId: string,
  ): Promise<Top> {
    return this.topService.getTopById(parseInt(topCategoryId));
  }

  @Post()
  async createTop(@Body() createTopDto: CreateTopDto): Promise<Top> {
    return this.topService.createTop(createTopDto);
  }

  @Patch('/:topCategoryId')
  async updateReview(
    @Param('topCategoryId') topCategoryId: string,
    @Body() topData: UpdateTopDto,
  ): Promise<Top> {
    return this.topService.updateTop(parseInt(topCategoryId), topData);
  }
  @Delete('/:topCategoryId')
  async deleteReview(
    @Param('topCategoryId') topCategoryId: string,
  ): Promise<void> {
    return this.topService.deleteTop(parseInt(topCategoryId));
  }
}
