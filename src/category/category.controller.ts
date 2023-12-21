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
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryParentDto } from './dto/create-categoryparent.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('/')
  getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Post('/addcategory')
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  // @Post('/addcategoryparent')
  // createCategoryParent(
  //   @Body() createCategoryParentDto: CreateCategoryParentDto,
  // ): Promise<Category> {
  //   return this.categoryService.createCategoryParent(createCategoryParentDto);
  // }

  @Delete('/:categoryId')
  deleteCategory(@Param('categoryId', ParseIntPipe) categoryId): Promise<void> {
    return this.categoryService.deleteCategory(categoryId);
  }

  @Patch('/:categoryId')
  updateCategory(
    @Param('categoryId') categoryId: number,
    @Body() categoryData: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(categoryId, categoryData);
  }
}
