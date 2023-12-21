import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateCategoryParentDto {
  @IsNotEmpty()
  categoryName: string;

  @IsEmpty()
  categoryParent: null;
}
