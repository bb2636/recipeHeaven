import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categorys')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAllCategory(): Promise<Category[]> {
    return this.categoryService.getAllCategory();
  }
  @Get('/:categoryId')
  getCategoryById(@Param('categoryId') categoryId: number): Promise<Category> {
    return this.categoryService.getCategoryById(categoryId);
  }

  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createTop(createCategoryDto);
  }

  @Patch('/:categoryId')
  updateCategory(
    @Param('categoryId') categoryId: number,
    @Body() categoryData: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(categoryId, categoryData);
  }
  @Delete('/:categoryId')
  deleteCategory(@Param('categoryId') categoryId): Promise<void> {
    return this.categoryService.deleteCategory(categoryId);
  }
}
