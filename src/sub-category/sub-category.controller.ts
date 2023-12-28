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
} from '@nestjs/common';
import { SubService } from './sub-category.service';
import { UpdateSubDto } from './dto/update-sub.dto';
import { Sub } from './sub-category.entity';
import { CreateSubDto } from './dto/create-sub.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('sub-categorys')
@UseGuards(AuthGuard())
export class SubCategoryController {
  constructor(private subService: SubService) {}

  @Get()
  getAllCategory(): Promise<Sub[]> {
    return this.subService.getAllCategory();
  }
  @Get('/:subCategoryId')
  getSubById(@Param('subCategoryId') subCategoryId: number): Promise<Sub> {
    return this.subService.getSubById(subCategoryId);
  }

  @Post('/:topCategoryId')
  createSub(
    @Param('topCategoryId') topCategoryId: number,
    @Body() createSubDto: CreateSubDto,
  ): Promise<Sub> {
    return this.subService.createSub(topCategoryId, createSubDto);
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
