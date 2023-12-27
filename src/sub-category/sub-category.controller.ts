import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  async getAllCategory(): Promise<Sub[]> {
    return this.subService.getAllCategory();
  }
  @Get('/:subCategoryId')
  async getSubById(
    @Param('subCategoryId') subCategoryId: string,
  ): Promise<Sub> {
    return this.subService.getSubById(parseInt(subCategoryId));
  }

  @Post()
  async createSub(
    @Param('topCategoryId') topCategoryId: string,
    @Body() createSubDto: CreateSubDto,
  ): Promise<Sub> {
    return this.subService.createSub(parseInt(topCategoryId), createSubDto);
  }

  @Patch('/:subCategoryId')
  async updateSub(
    @Param('subCategoryId') subCategoryId: string,
    @Param('topCategoryId') topCategoryId: string,
    @Body() subData: UpdateSubDto,
  ): Promise<Sub> {
    const parseIntTopId = parseInt(topCategoryId);
    const parseIntSubId = parseInt(subCategoryId);
    return this.subService.updateSub(parseIntSubId, subData, parseIntTopId);
  }
  @Delete('/:subCategoryId')
  async deleteSub(
    @Param('subCategoryId') subCategoryId: string,
  ): Promise<void> {
    return this.subService.deleteSub(parseInt(subCategoryId));
  }
}
