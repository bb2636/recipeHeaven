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
import { SubCategoryService } from './sub-category.service';
import { UpdateSubDto } from './dto/update-sub.dto';
import { Sub } from './sub-category.entity';
import { CreateSubDto } from './dto/create-sub.dto';

@Controller('sub-categorys')
export class SubCategoryController {
  constructor(private subService: SubCategoryService) {}

  @Get()
  getAllCategory(): Promise<Sub[]> {
    return this.subService.getAllCategory();
  }
  @Get('/:subCategoryId')
  getSubById(@Param('subCategoryId') subCategoryId: number): Promise<Sub> {
    return this.subService.getSubById(subCategoryId);
  }

  @Post()
  createSub(@Body() createTopDto: CreateSubDto): Promise<Sub> {
    return this.subService.createSub(createTopDto);
  }

  @Patch('/:subCategoryId')
  updateSub(
    @Param('subCategoryId') subCategoryId: number,
    topCategoryId: number,
    @Body() subData: UpdateSubDto,
  ): Promise<Sub> {
    return this.subService.updateSub(subCategoryId, subData, topCategoryId);
  }
  @Delete('/:subCategoryId')
  deleteSub(
    @Param('subCategoryId', ParseIntPipe) subCategoryId,
  ): Promise<void> {
    return this.subService.deleteSub(subCategoryId);
  }
}
