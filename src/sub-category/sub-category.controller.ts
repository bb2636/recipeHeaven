import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SubService } from './sub-category.service';
import { UpdateSubDto } from './dto/update-sub.dto';
import { Sub } from './sub-category.entity';
import { CreateSubDto } from './dto/create-sub.dto';

@Controller('sub-categorys')
export class SubCategoryController {
  constructor(private subService: SubService) {}

  @Get()
  getAllCategory(): Promise<Sub[]> {
    return this.subService.getAllCategory();
  }
  @Get('/:subCategoryId')
  getSubById(
    @Param('subCategoryId', ParseIntPipe) subCategoryId: number,
  ): Promise<Sub> {
    return this.subService.getSubById(subCategoryId);
  }

  @Post('/:topCategoryId')
  createSub(
    @Param('topCategoryId', ParseIntPipe) topCategoryId: string,
    @Body() createSubDto: CreateSubDto,
  ): Promise<Sub> {
    const parseIntTopId = parseInt(topCategoryId);
    if (isNaN(parseIntTopId)) {
      throw new BadRequestException('Invalid topCategoryId');
    }
    return this.subService.createSub(parseIntTopId, createSubDto);
  }

  @Patch('/:subCategoryId')
  updateSub(
    @Param('subCategoryId', ParseIntPipe) subCategoryId: number,
    @Param('topCategoryId', ParseIntPipe) topCategoryId: string,
    @Body() subData: UpdateSubDto,
  ): Promise<Sub> {
    const parseIntTopId = parseInt(topCategoryId);
    return this.subService.updateSub(subCategoryId, subData, parseIntTopId);
  }
  @Delete('/:subCategoryId')
  deleteSub(
    @Param('subCategoryId', ParseIntPipe) subCategoryId: number,
  ): Promise<void> {
    return this.subService.deleteSub(subCategoryId);
  }
}
