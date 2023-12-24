import { User } from 'src/auth/user.entity';

export class DeleteRecipeDto {
  user: User;
  recipeId: number;

  constructor(deleteRecipeDto: { recipeId: number }, user: User) {
    this.user = user;
    this.recipeId = deleteRecipeDto.recipeId;
  }
}
